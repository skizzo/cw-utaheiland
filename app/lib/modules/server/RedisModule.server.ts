import {Config} from "~/lib/config"
import {sleep} from "~/lib/utils"

import {createClient, type RedisClientOptions} from "redis"

import {createLog} from "../Logger"

const log = createLog("RedisModule")

const USE_CACHE = Config.app.debug.useRedisCache || !__DEV__
const DEFAULT_TTL = 60 * 5 // 5 minutes

const CacheConfigRemote = {
  publicUrl: process.env.REDIS_CACHE_PUBLIC_URL,
  url: process.env.REDIS_CACHE_URL,
  host: process.env.REDIS_CACHE_HOST,
  password: process.env.REDIS_CACHE_PASSWORD,
  port: parseInt(process.env.REDIS_CACHE_PORT || "-1"),
  user: process.env.REDIS_CACHE_USER,
  family: 6,
} as const

const CacheConfigLocal = {
  host: "localhost",
  port: 6379,
} as const

type RedisClient = ReturnType<typeof createClient> | null

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class RedisModule {
  //

  static client: ReturnType<typeof createClient> | null
  static initializing = false
  static initialized = false

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async getClient(): Promise<RedisClient | null> {
    //
    if (RedisModule.initialized) {
      if (RedisModule.client) {
        return RedisModule.client // initialized before -> return client
      }
      debugger // this shouldn't happen
    }

    if (RedisModule.initializing) {
      await sleep(1000)
      return RedisModule.getClient()
    }
    RedisModule.initializing = true

    const options: RedisClientOptions = __DEV__
      ? {
          // local
          url: `redis://${CacheConfigLocal.host}:${CacheConfigLocal.port}`, // redis://localhost:6379
          pingInterval: 5000,
          socket: {
            tls: false,
            // tls: url.match(/rediss:/) != null,
            // rejectUnauthorized: false,
          },
        }
      : {
          // remote
          pingInterval: 5000,
          url: CacheConfigRemote.url,
          username: CacheConfigRemote.user,
          password: CacheConfigRemote.password,
          socket: {
            host: CacheConfigRemote.host,
            port: CacheConfigRemote.port,
            family: CacheConfigRemote.family,
          },
        }

    RedisModule.client = createClient(options)

    RedisModule.client.on("error", error => {
      log.error("RedisModule Error:" + error)
    })
    RedisModule.client.on("connect", () => {
      log.log(`RedisModule connected!`)
    })

    try {
      await RedisModule.client.connect()
      const pingResult = await RedisModule.client.ping()
    } catch (error) {
      console.error(error)
    }

    RedisModule.initializing = false
    RedisModule.initialized = true

    // debugger // check pingResult
    return RedisModule.client
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async cached<T>(keyRaw: string, fn: () => Promise<T>, ttl = DEFAULT_TTL): Promise<T> {
    const key = `${Config.app.code}-${keyRaw}`

    const redis = await RedisModule.getClient()
    if (USE_CACHE) {
      if (redis) {
        try {
          const hit = await redis.get(key)
          if (hit) {
            log.log("cached: cache hit", {key})
            return JSON.parse(hit) as T
          }
        } catch (e) {
          console.error("Redis get error:", e)
        }
      }
    }

    const data = await fn()

    if (USE_CACHE) {
      if (redis) {
        try {
          await redis.set(key, JSON.stringify(data), {EX: ttl})
        } catch (e) {
          console.error("Redis set error:", e)
        }
      }
    }

    return data
  }
}

export {RedisModule}
