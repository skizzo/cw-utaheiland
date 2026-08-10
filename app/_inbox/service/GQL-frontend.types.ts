import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**  Custom Scalar for Date  */
  Date: { input: any; output: any; }
  /**  Custom Scalar for a MongoDB Object ID  */
  DbObjectId: { input: any; output: any; }
  /**  Custom Scalar for a JS Timestamp (milliseconds)  */
  Timestamp: { input: any; output: any; }
};

/** An Analytics Event added via [`addAnalyticsEvent`]({{Mutations.addAnalyticsEvent}}) */
export type AnalyticsEvent = {
  __typename?: 'AnalyticsEvent';
  /**  Timestamp  */
  added: Scalars['Timestamp']['output'];
  /**  Language-dependent  */
  addedReadable: Scalars['String']['output'];
  /**  Gallery Code that was active when then the Event was sent  */
  code?: Maybe<Scalars['String']['output']>;
  /**  Event Data  */
  data: Array<AnalyticsEventDataEntry>;
  /**  IP of the sender of the Event  */
  ip?: Maybe<Scalars['String']['output']>;
  /**  Language of the Client's Device  */
  lang: Scalars['String']['output'];
  /**  `app`, `web`, `wp`, `graphql`, `express`, `worker`,  */
  origin: AnalyticsEventOrigin;
  /**  `ios`, `android`, etc.  */
  platform?: Maybe<ClientPlatform>;
  /**  `JobAdded`, `UserLogin´, etc.  */
  type: AnalyticsEventType;
  typeKey: Scalars['String']['output'];
  /**  User ID that triggered the Event  */
  uid: Scalars['String']['output'];
  user?: Maybe<User>;
  /**  e.g. `1.1.10`  */
  version: Scalars['String']['output'];
};

export type AnalyticsEventDataEntry = {
  __typename?: 'AnalyticsEventDataEntry';
  /**  **Key**, e.g. `uid` or `artwork-slug`  */
  key: Scalars['String']['output'];
  /**  **Value**, e.g. `slug-1` or `0.4295`  */
  val?: Maybe<Scalars['String']['output']>;
};

export type AnalyticsEventDataEntryInput = {
  /**  **Key**, e.g. `uid` or `artwork-slug`  */
  key: Scalars['String']['input'];
  /**  **Value**, e.g. `slug-1` or `0.4295`  */
  val?: InputMaybe<Scalars['String']['input']>;
};

/** Used for the `origin` value in [`Mutations.addAnalyticsEvent`]({{Mutations.addAnalyticsEvent}}) */
export enum AnalyticsEventOrigin {
  /**  iOS-/Android App  */
  App = 'app',
  /**  Cleanup  */
  Cleanup = 'cleanup',
  /**  Express  */
  Express = 'express',
  /**  GraphQL Backend  */
  Graphql = 'graphql',
  /**  Website  */
  Web = 'web',
  /**  Worker  */
  Worker = 'worker',
  /**  WordPress Backend  */
  Wp = 'wp'
}

/** Used for the `type` value of an Analytics Event */
export enum AnalyticsEventType {
  /**  User **likes** an Artist  */
  ArtistLike = 'ArtistLike',
  /**  TODO: ⚠️ User **shares** an Artist  */
  ArtistShare = 'ArtistShare',
  /**  User **unlikes** an Artist  */
  ArtistUnlike = 'ArtistUnlike',
  /**  User **views** an Artist - ⏱️ **sent only once a day per user/code**  */
  ArtistView = 'ArtistView',
  /**  TODO: ⚠️ User views an Artwork with Viro AR  */
  ArtworkArView = 'ArtworkArView',
  /**  User **explores** an Artwork  */
  ArtworkExplore = 'ArtworkExplore',
  /**  User **likes** an Artwork  */
  ArtworkLike = 'ArtworkLike',
  /**  TODO: ⚠️ User **shares** an Artwork  */
  ArtworkShare = 'ArtworkShare',
  /**  TODO: ⚠️ User clicks on suggested Wall of an Artwork  */
  ArtworkSuggWallClick = 'ArtworkSuggWallClick',
  /**  User **unlikes** an Artwork  */
  ArtworkUnlike = 'ArtworkUnlike',
  /**  User **views** an Artwork - ⏱️ **sent only once a day per user/code**  */
  ArtworkView = 'ArtworkView',
  /**  TODO: ⚠️ User clicks on 'View on Wall' in Artwork Details Screen  */
  ArtworkViewOnWallClick = 'ArtworkViewOnWallClick',
  /**  User **likes** a Blog  */
  BlogLike = 'BlogLike',
  /**  User **shares** a Blog  */
  BlogShare = 'BlogShare',
  /**  User **unlikes** a Blog  */
  BlogUnlike = 'BlogUnlike',
  /**  User **views** a Blog  */
  BlogView = 'BlogView',
  /**  TODO: ⚠️ User (or gallery manager) sends a message in a Gallery Chat  */
  ChatMessageSend = 'ChatMessageSend',
  /**  TODO: ⚠️ User starts or resumes a Gallery Chat  */
  ChatOpen = 'ChatOpen',
  /**  A cleanup script has finished and changed data  */
  CleanupDone = 'CleanupDone',
  /**  TODO: ⚠️ User **adds** an Event **to the Calendar**  */
  EventAddToCalendar = 'EventAddToCalendar',
  /**  User **likes** an Event  */
  EventLike = 'EventLike',
  /**  User **shares** an Event  */
  EventShare = 'EventShare',
  /**  TODO: ⚠️ User clicks **Show External Organizer Infos** of an Event  */
  EventShowExtOrganizerInfos = 'EventShowExtOrganizerInfos',
  /**  TODO: ⚠️ User clicks **Show Infos** of an Event  */
  EventShowInfos = 'EventShowInfos',
  /**  TODO: ⚠️ User clicks **Show Infos** of an Event  */
  EventShowLocation = 'EventShowLocation',
  /**  User **unlikes** an Event  */
  EventUnlike = 'EventUnlike',
  /**  User **views** an Event  */
  EventView = 'EventView',
  /**  User **favorites** a Gallery  */
  GalleryFavorite = 'GalleryFavorite',
  /**  User visits a Gallery for the **very first time**  */
  GalleryFirstVisit = 'GalleryFirstVisit',
  /**  TODO: ⚠️ User removes a Gallery from his followed galleries  */
  GalleryRemove = 'GalleryRemove',
  /**  User **unfavorites** a Gallery  */
  GalleryUnfavorite = 'GalleryUnfavorite',
  /**  User opens app with or switches to Gallery - ⏱️ **sent only once a day per user/code**  */
  GalleryView = 'GalleryView',
  /**  Bull Job is added to the Worker Queue  */
  JobAdded = 'JobAdded',
  /**  TODO: ⚠️ User taps a notification  */
  NotificationTap = 'NotificationTap',
  /**  A triggered notification is sent to a user  */
  NotificationTriggeredSend = 'NotificationTriggeredSend',
  /**  An Resource (like Artwork, Artist, Gallery, etc.) has been synced with actions performed  */
  ResourceSynced = 'ResourceSynced',
  SurfaceDelete = 'SurfaceDelete',
  /**  User deletes his/her account  */
  UserDelete = 'UserDelete',
  /**  TODO: ⚠️ User logs in (via email or social)  */
  UserLogin = 'UserLogin',
  /**  TODO: ⚠️ User logs out  */
  UserLogout = 'UserLogout',
  /**  TODO: ⚠️ User registers (via email or social)  */
  UserRegistration = 'UserRegistration',
  /**  User **deletes** a Wall  */
  WallDelete = 'WallDelete',
  /**  TODO: ⚠️ User saves Wall image to camera roll  */
  WallImageExport = 'WallImageExport',
  /**  User **likes** a Wall  */
  WallLike = 'WallLike',
  /**  TODO: ⚠️ User sets a Wall from public to private  */
  WallMakePrivate = 'WallMakePrivate',
  /**  TODO: ⚠️ User sets a Wall from private to public  */
  WallMakePublic = 'WallMakePublic',
  /**  User saves a Wall  */
  WallSave = 'WallSave',
  /**  TODO: ⚠️ User shares a Wall image to Instagram  */
  WallShareInsta = 'WallShareInsta',
  /**  TODO: ⚠️ User shares the link to a Public Wall  */
  WallShareLink = 'WallShareLink',
  /**  User **unlikes** a Wall  */
  WallUnlike = 'WallUnlike'
}

export enum AnalyticsEventsFilter {
  Events = 'events',
  Resourcessynced = 'resourcessynced'
}

export enum AnalyticsEventsSortBy {
  Newest = 'newest'
}

/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type Artist = {
  __typename?: 'Artist';
  additionalImages?: Maybe<Array<Image>>;
  additionalImagesIds?: Maybe<Array<Scalars['String']['output']>>;
  /**  Additional Images in size `u500`  */
  additionalImagesThumbUrls?: Maybe<Array<Scalars['String']['output']>>;
  /**  Additional Images in size `u1500`  */
  additionalImagesUrls?: Maybe<Array<Scalars['String']['output']>>;
  additionalImagesWp?: Maybe<Array<ImageWp>>;
  amountArtworks?: Maybe<Scalars['Int']['output']>;
  amountArtworksDraft?: Maybe<Scalars['Int']['output']>;
  artworks?: Maybe<Array<Artwork>>;
  artworksIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**  Language-dependent  */
  city?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post Content (language-dependent)  */
  content?: Maybe<Scalars['String']['output']>;
  /**  Content (in **HTML format**) in all available languages  */
  contentsHtml: StringInLangs;
  /**  Content (in **Markdown format**) in all available languages  */
  contentsMd: StringInLangs;
  /**  Language-dependent  */
  country?: Maybe<Scalars['String']['output']>;
  /**  2-digit, lowercase ISO code  */
  countryCode?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post Timestamp  */
  created?: Maybe<Scalars['Timestamp']['output']>;
  /**  Language-dependent  */
  createdReadable?: Maybe<Scalars['String']['output']>;
  /**  Language-dependent, e.g. `23. Juni 2025, 19:32`  */
  createdReadableShort: Scalars['String']['output'];
  curriculum?: Maybe<Array<ArtistCurriculumEntry>>;
  featuredImage?: Maybe<Image>;
  /**  Featured Image in size `u500`  */
  featuredImageThumbUrl?: Maybe<Scalars['String']['output']>;
  /**  Featured Image in size `u1500`  */
  featuredImageUrl?: Maybe<Scalars['String']['output']>;
  featuredImageWp?: Maybe<ImageWp>;
  firstName?: Maybe<Scalars['String']['output']>;
  galleries?: Maybe<Array<Gallery>>;
  galleriesCodes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**  all **user-managed** Galleries that this Artist belongs to  */
  galleriesManaged?: Maybe<Array<Gallery>>;
  galleriesProtectedCodes?: Maybe<Array<Scalars['String']['output']>>;
  galleryChatCode?: Maybe<Scalars['String']['output']>;
  /**  `u`, `m`, `f`, `p`, `n`  */
  gender?: Maybe<Scalars['String']['output']>;
  hasAdditionalImages: Scalars['Boolean']['output'];
  /**  YouTube Video URL  */
  heroVideoUrl?: Maybe<Scalars['String']['output']>;
  /**  YouTube Video ID  */
  heroVideoYoutubeId?: Maybe<Scalars['String']['output']>;
  /**  Unique Artist Slug  */
  id: Scalars['String']['output'];
  inListedGallery?: Maybe<Scalars['Boolean']['output']>;
  inProtectedGallery?: Maybe<Scalars['Boolean']['output']>;
  /**  If `true`, `NEW` badge in app is always shown  */
  isNew?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Array<Link>>;
  /**  If `true`, also shows up in iazzu Gallery  */
  listed?: Maybe<Scalars['Boolean']['output']>;
  /**  SEO Data used for e.g. in REST API for `GET /postdata`  */
  seoData?: Maybe<WebSeoData>;
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  /**  If `true`, never shows up in App Store Version  */
  stagingOnly?: Maybe<Scalars['Boolean']['output']>;
  /**  WordPress Post Status  */
  status: WpStatus;
  /**  WordPress Post Title  */
  title: Scalars['String']['output'];
  /**  Language-dependent  */
  titleCityCountry?: Maybe<Scalars['String']['output']>;
  totalLikes?: Maybe<Array<Maybe<UserWithMetaTimes>>>;
  totalLikesAmount?: Maybe<Scalars['Int']['output']>;
  totalSeens?: Maybe<Array<Maybe<UserWithMetaTimes>>>;
  totalSeensAmount?: Maybe<Scalars['Int']['output']>;
  /**  User-dependent  */
  userAccessData?: Maybe<ProtectedContentUserAccessData>;
  /**  User-dependent  */
  userCanAccessProtectedContent?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userCanOrCantAccessProtectedContentReason?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userLiked?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userLikedTime?: Maybe<Scalars['Timestamp']['output']>;
  /**  User- & language-dependent  */
  userLikedTimeReadable?: Maybe<Scalars['String']['output']>;
  userManagesGallery?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userSeen?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userSeenTime?: Maybe<Scalars['Timestamp']['output']>;
  /**  User- & language-dependent  */
  userSeenTimeReadable?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post ID  */
  wpPostId?: Maybe<Scalars['Int']['output']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistAdditionalImagesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistArtworksArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Currency>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ArtworkSortBy>;
  unit?: InputMaybe<DimensionsUnit>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistContentArgs = {
  charsMax?: InputMaybe<Scalars['Int']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistCountryArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistCurriculumArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistFeaturedImageArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistFeaturedImageUrlArgs = {
  size?: InputMaybe<ImageSizeSize>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistGalleriesArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistSeoDataArgs = {
  currency?: InputMaybe<Currency>;
  lang?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<DimensionsUnit>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistTotalLikesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * An Artist defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artist).
 *
 * Example: **Steff Müller** ([de](https://iazzu.com/wp/wp-admin/post.php?post=24217&action=edit), [en](https://iazzu.com/wp/wp-admin/post.php?post=17026&action=edit))
 */
export type ArtistTotalSeensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtistCurriculumEntry = {
  __typename?: 'ArtistCurriculumEntry';
  text?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
  yearString?: Maybe<Scalars['String']['output']>;
};

export enum ArtistFilter {
  /**  Liked Artist, user-dependent */
  Liked = 'liked',
  /**  Listed Artists  */
  Listed = 'listed'
}

export enum ArtistGalleryQueryMode {
  /**  Default  */
  All = 'all'
}

export enum ArtistSortBy {
  /**  First-/Last name  */
  FirstLastName = 'firstLastName',
  /**  Last liked Artist first, user-dependent  */
  LastLiked = 'lastLiked',
  /**  Newest Artist first */
  Newest = 'newest',
  /**  Oldest Artist first  */
  Oldest = 'oldest'
}

export type ArtistsStats = {
  __typename?: 'ArtistsStats';
  listed: Scalars['Int']['output'];
  listedIds: Array<Scalars['String']['output']>;
  protected: Scalars['Int']['output'];
  protectedIds: Array<Scalars['String']['output']>;
  stagingOnly: Scalars['Int']['output'];
  stagingOnlyIds: Array<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
  totalIds: Array<Scalars['String']['output']>;
};

/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type Artwork = {
  __typename?: 'Artwork';
  /**  Variant index handed over when calling `Artwork.Model.getItemGqlByDb()`  */
  _variantIndex?: Maybe<Scalars['Int']['output']>;
  /**  Additional Images **with hashes** (that are added in Artwork resolvers)  */
  additionalImages?: Maybe<Array<Image>>;
  additionalImagesIds?: Maybe<Array<Scalars['String']['output']>>;
  additionalImagesWp?: Maybe<Array<ImageWp>>;
  /**  Amount of Artwork Materials assigned to this Artwork  */
  amountMaterials: Scalars['Int']['output'];
  /**  Amount of Artwork Techniques assigned to this Artwork  */
  amountTechniques: Scalars['Int']['output'];
  areaCm?: Maybe<Scalars['Int']['output']>;
  artists?: Maybe<Array<Artist>>;
  artistsSlugs: Array<Scalars['String']['output']>;
  /**  Artwork's **Artist Title(s)**, separated by `,` and `&` if necessary  */
  artistsTitles?: Maybe<Scalars['String']['output']>;
  artistsTitlesCitiesCountries?: Maybe<Scalars['String']['output']>;
  authCertificate: Scalars['Boolean']['output'];
  /**  e.g. `forsaleorrent`  */
  availabilityStatus: ArtworkAvailabilityStatus;
  availabilityStatusReadable: Scalars['String']['output'];
  availabilityStatusWp: Scalars['String']['output'];
  /**  If given, there is a reason why the Artwork can't be converted to an User Artwork (any more)  */
  cantBeConvertedFromWpReason?: Maybe<CantBeConvertedFromWpReason>;
  categories?: Maybe<Array<Maybe<ArtworkCategory>>>;
  /**  new in TS  */
  categoriesIds?: Maybe<Array<Scalars['String']['output']>>;
  categoriesTitles?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post Content (language-dependent)  */
  content?: Maybe<Scalars['String']['output']>;
  /**  Content (in **HTML format**) in all available languages  */
  contentsHtml: StringInLangs;
  /**  Content (in **Markdown format**) in all available languages  */
  contentsMd: StringInLangs;
  /**  If `true`, Artwork was **converted to a User Artwork** either via app or WordPress Backend  */
  convertedFromWp: Scalars['Boolean']['output'];
  /**  Language-dependent  */
  country?: Maybe<Scalars['String']['output']>;
  /**  2-digit **lower-case** ISO code  */
  countryCode?: Maybe<Scalars['String']['output']>;
  /**  based on WordPress Post Timestamp  */
  created: Scalars['Timestamp']['output'];
  createdBy?: Maybe<User>;
  /**  Language-dependent, e.g. `Montag, 23. Juni 2025, 19:32`  */
  createdReadable: Scalars['String']['output'];
  /**  Language-dependent, e.g. `23. Juni 2025, 19:32`  */
  createdReadableShort: Scalars['String']['output'];
  /**  default Currency of Artwork's Gallery  */
  currencyGallery?: Maybe<Currency>;
  dimensions?: Maybe<ArtworkDimensions>;
  dimensionsHeightReadable?: Maybe<Scalars['String']['output']>;
  dimensionsReadable?: Maybe<Scalars['String']['output']>;
  dimensionsWidthReadable?: Maybe<Scalars['String']['output']>;
  dominantColors?: Maybe<Array<Scalars['String']['output']>>;
  edition: Scalars['Boolean']['output'];
  /**  Language-dependent  */
  editionInfos?: Maybe<Scalars['String']['output']>;
  /**  Edition Infos (in **HTML format**) in all available languages  */
  editionInfosHtml: StringInLangs;
  /**  Edition Infos (in **Markdown format**) in all available languages  */
  editionInfosMd: StringInLangs;
  featuredImage?: Maybe<Image>;
  /**  Featured Image in size `u500`  */
  featuredImageThumbUrl?: Maybe<Scalars['String']['output']>;
  /**  Featured Image in size `u1500`  */
  featuredImageUrl?: Maybe<Scalars['String']['output']>;
  featuredImageWp?: Maybe<ImageWp>;
  floorBased: Scalars['Boolean']['output'];
  galleries?: Maybe<Array<Maybe<Gallery>>>;
  galleriesCodes?: Maybe<Array<Scalars['String']['output']>>;
  galleriesProtectedCodes?: Maybe<Array<Scalars['String']['output']>>;
  /**  Artwork's **Gallery Title(s)**, separated by `,` and `&` if necessary  */
  galleriesTitles?: Maybe<Scalars['String']['output']>;
  hasAdditionalImages: Scalars['Boolean']['output'];
  hasVariants: Scalars['Boolean']['output'];
  /**  YouTube Video URL  */
  heroVideoUrl?: Maybe<Scalars['String']['output']>;
  inGalleryNotAllowingPublicWallsAllUsers?: Maybe<Scalars['Boolean']['output']>;
  inGalleryWithHiddenArtworkPrices?: Maybe<Scalars['Boolean']['output']>;
  /**  Depends on Gallery, if `true`: also shows up in iazzu Gallery  */
  inListedGallery?: Maybe<Scalars['Boolean']['output']>;
  inProtectedGallery?: Maybe<Scalars['Boolean']['output']>;
  internalNotes?: Maybe<Scalars['String']['output']>;
  /** private */
  inventoryNumber?: Maybe<Scalars['String']['output']>;
  /**  If `true`, `NEW` badge in app is always shown  */
  isNew: Scalars['Boolean']['output'];
  materials?: Maybe<Array<ArtworkMaterial>>;
  materialsReadable?: Maybe<Scalars['String']['output']>;
  materialsSlugs: Array<Scalars['String']['output']>;
  maximumRandomLikes?: Maybe<Scalars['Float']['output']>;
  notPlanar: Scalars['Boolean']['output'];
  /**  values from Firebase; only set when this is an User Artwork  */
  originalImage?: Maybe<ArtworkOriginalImage>;
  /**  if `false`, Artwork **cannot** be used for projecting on a Surface  */
  planar: Scalars['Boolean']['output'];
  /**  Price in the **requested** Currency  */
  price?: Maybe<Scalars['Float']['output']>;
  /**  Currency set in App/Backend  */
  priceCurrency: Currency;
  /**  Price in `priceCurrency` (Currency set in App/Backend)  */
  priceCurrencyValue?: Maybe<Scalars['Float']['output']>;
  priceDisplayable?: Maybe<Scalars['Boolean']['output']>;
  priceEuro?: Maybe<Scalars['Float']['output']>;
  priceEuroSortMax?: Maybe<Scalars['Float']['output']>;
  priceEuroSortMin?: Maybe<Scalars['Float']['output']>;
  priceExact?: Maybe<Scalars['Float']['output']>;
  priceIsExact: Scalars['Boolean']['output'];
  priceReadable?: Maybe<Scalars['String']['output']>;
  /**  respects the `availabilityStatus` and returns either price, or 'Price on Request'  */
  priceReadableByStatus?: Maybe<Scalars['String']['output']>;
  /**  All Public Walls for this Artwork  */
  publicWalls?: Maybe<Array<Wall>>;
  purchaseLink?: Maybe<Scalars['String']['output']>;
  /**  Random number based on the Artwork's slug  */
  randomNumberBySlug: Scalars['Float']['output'];
  /**
   * If an artwork is <b>ready to hang</b>, it can be put on a wall without any further steps.
   * If it is not, that usually means that a frame or some kind of hanging mechanism is required before putting the piece of art onto a wall.
   */
  readyToHang: Scalars['Boolean']['output'];
  /**  SEO Data used for e.g. in REST API for `GET /postdata`  */
  seoData?: Maybe<WebSeoData>;
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  slugByTitle?: Maybe<Scalars['String']['output']>;
  /**  Exception for e.g. Artwork with slug `steff-test-batman`, here the Firebase data is found via this and not the `slug` itself  */
  slugFirebase?: Maybe<Scalars['String']['output']>;
  /**  Depends on Gallery, if `true`: never shows up in App Store Version  */
  stagingOnly?: Maybe<Scalars['Boolean']['output']>;
  /**  Upper-case WordPress Post Status, e.g. `PUBLISH`  */
  status: WpStatus;
  /**  Lower-case (original) WordPress Post Status, e.g. `publish`  */
  statusWp: Scalars['String']['output'];
  techniques?: Maybe<Array<ArtworkTechnique>>;
  techniquesReadable?: Maybe<Scalars['String']['output']>;
  techniquesSlugs: Array<Scalars['String']['output']>;
  /**  WordPress Post Title  */
  title: Scalars['String']['output'];
  totalExploresAmount?: Maybe<Scalars['Int']['output']>;
  totalLikes?: Maybe<Array<Maybe<UserWithMetaTimes>>>;
  totalLikesAmount?: Maybe<Scalars['Int']['output']>;
  totalRandomLikes?: Maybe<Scalars['Int']['output']>;
  totalSeensAmount?: Maybe<Scalars['Int']['output']>;
  /**  based on last update via `Artwork.updateSingle()`  */
  updated?: Maybe<Scalars['Timestamp']['output']>;
  /**  Language-dependent, e.g. `Montag, 23. Juni 2025, 19:32`  */
  updatedReadable?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userAccessData?: Maybe<ProtectedContentUserAccessData>;
  /**  If `true`, Artwork was **created in app** or **converted to User Artwork**  */
  userArtwork: Scalars['Boolean']['output'];
  /**  User-dependent  */
  userCanAccessProtectedContent?: Maybe<Scalars['Boolean']['output']>;
  userCanEdit?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userCanOrCantAccessProtectedContentReason?: Maybe<Scalars['String']['output']>;
  userCanView?: Maybe<Scalars['Boolean']['output']>;
  userExplored?: Maybe<Scalars['Boolean']['output']>;
  userExploredTime?: Maybe<Scalars['Timestamp']['output']>;
  userExploredTimeReadable?: Maybe<Scalars['String']['output']>;
  userExploredValue?: Maybe<Scalars['String']['output']>;
  userLiked?: Maybe<Scalars['Boolean']['output']>;
  userLikedTime?: Maybe<Scalars['Timestamp']['output']>;
  userLikedTimeReadable?: Maybe<Scalars['String']['output']>;
  userManagesGallery?: Maybe<Scalars['Boolean']['output']>;
  userSeen?: Maybe<Scalars['Boolean']['output']>;
  userSeenTime?: Maybe<Scalars['Timestamp']['output']>;
  userSeenTimeReadable?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Array<ArtworkVariant>>;
  variantsFull?: Maybe<Array<ArtworkVariant>>;
  walls?: Maybe<Array<Maybe<Wall>>>;
  /**  WordPress Post ID (`-1` if not available in WordPress)  */
  wpPostId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
  yearStarted?: Maybe<Scalars['Int']['output']>;
  /**  YouTube Video ID  */
  youtubeVideoId?: Maybe<Scalars['String']['output']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkAdditionalImagesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkArtistsArgs = {
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkContentArgs = {
  charsMax?: InputMaybe<Scalars['Int']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkCountryArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkCountryCodeArgs = {
  uppercase?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkDimensionsHeightReadableArgs = {
  unit?: InputMaybe<DimensionsUnit>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkDimensionsReadableArgs = {
  unit?: InputMaybe<DimensionsUnit>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkDimensionsWidthReadableArgs = {
  unit?: InputMaybe<DimensionsUnit>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkEditionInfosArgs = {
  charsMax?: InputMaybe<Scalars['Int']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkFeaturedImageArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkFeaturedImageUrlArgs = {
  size?: InputMaybe<ImageSizeSize>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkGalleriesArgs = {
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * An Artwork defined in
 *
 * 1. the [**iazzu WP backend**](https://iazzu.com/wp/wp-admin/edit.php?post_type=product), and/or in
 *
 * 2. the app's **Artwork Editor** (User Artwork, Converted Artwork).
 */
export type ArtworkSeoDataArgs = {
  currency?: InputMaybe<Currency>;
  lang?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<DimensionsUnit>;
};

export enum ArtworkAvailabilityStatus {
  /**  WordPress: `available`  */
  Available = 'AVAILABLE',
  /**  WordPress: `forrent`  */
  Forrent = 'FORRENT',
  /**  WordPress: `forsaleorrent`  */
  Forsaleorrent = 'FORSALEORRENT',
  /**  WordPress: `gifted`  */
  Gifted = 'GIFTED',
  /**  WordPress: `privateownership`  */
  Privateownership = 'PRIVATEOWNERSHIP',
  /**  WordPress: `reserved`  */
  Reserved = 'RESERVED',
  /**  WordPress: `sold`  */
  Sold = 'SOLD',
  /**  WordPress: `tempunavailable`  */
  Tempunavailable = 'TEMPUNAVAILABLE',
  /**  WordPress: `unavailable`  */
  Unavailable = 'UNAVAILABLE'
}

export type ArtworkCategoriesStats = {
  __typename?: 'ArtworkCategoriesStats';
  total?: Maybe<Scalars['Int']['output']>;
};

/** An Artwork Category defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artworkcategory). */
export type ArtworkCategory = {
  __typename?: 'ArtworkCategory';
  /**  Total amount of Artworks with this Category, **not including** Artworks in `DRAFT` status  */
  amountArtworks?: Maybe<Scalars['Int']['output']>;
  /**  Total amount of Artworks with this Category in `DRAFT` status  */
  amountArtworksDraft?: Maybe<Scalars['Int']['output']>;
  /**  Unique Category Slug  */
  id: Scalars['String']['output'];
  /**
   * Unique ID of the resource that this category was requested for:
   *
   * - Parent Type '`gallery`': Gallery Code
   * - Parent Type '`artwork`': Artwork Slug
   */
  parentId?: Maybe<Scalars['String']['output']>;
  /**  Resource context in which this category was requested  */
  parentType: ArtworkCategoryParentType;
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  /**  WordPress Post Title  */
  title: Scalars['String']['output'];
  /**  WordPress Post ID  */
  wpPostId?: Maybe<Scalars['Int']['output']>;
};

export enum ArtworkCategoryParentType {
  /**  **Artwork** scope  */
  Artwork = 'artwork',
  /**  **Gallery** scope  */
  Gallery = 'gallery',
  /**  **Global** scope  */
  Global = 'global'
}

/**  Artwork dimensions (**in mm**) */
export type ArtworkDimensions = {
  __typename?: 'ArtworkDimensions';
  /**  Artwork height (**in mm**) */
  height?: Maybe<Scalars['Float']['output']>;
  /**  Artwork width (**in mm**) */
  width?: Maybe<Scalars['Float']['output']>;
};

export enum ArtworkFilter {
  Explored = 'explored',
  Liked = 'liked',
  Unexplored = 'unexplored'
}

export type ArtworkFilterValuesColor = {
  __typename?: 'ArtworkFilterValuesColor';
  hex: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type ArtworkFilterValuesMaterial = {
  __typename?: 'ArtworkFilterValuesMaterial';
  amount: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ArtworkFilterValuesTechnique = {
  __typename?: 'ArtworkFilterValuesTechnique';
  amount: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum ArtworkGalleryQueryMode {
  All = 'all',
  Followed = 'followed',
  Listed = 'listed',
  Managed = 'managed',
  StagingOnly = 'stagingOnly'
}

/** An Artwork Material defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artworkmaterial). */
export type ArtworkMaterial = {
  __typename?: 'ArtworkMaterial';
  /**  Amount of Artworks that use this Artwork Material  */
  amountArtworks: Scalars['Int']['output'];
  /**  Amount of Artworks (including Drafts) that use this Artwork Material in the Gallery  */
  amountArtworksGallery?: Maybe<Scalars['Int']['output']>;
  /**  Artworks that use this Artwork Material  */
  artworks?: Maybe<Array<Artwork>>;
  /**  WordPress Post Timestamp  */
  created?: Maybe<Scalars['Timestamp']['output']>;
  /**  Unique Material Slug  */
  id: Scalars['String']['output'];
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  /**  WordPress Post Status  */
  status: WpStatus;
  /**  WordPress Post Title, language-dependent  */
  title: Scalars['String']['output'];
  /**  WordPress Post ID  */
  wpPostId?: Maybe<Scalars['Int']['output']>;
};


/** An Artwork Material defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artworkmaterial). */
export type ArtworkMaterialArtworksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtworkMaterialOrTechniqueToFix = {
  __typename?: 'ArtworkMaterialOrTechniqueToFix';
  lang: Scalars['String']['output'];
  slugs: Array<Scalars['String']['output']>;
  slugsDetails: Array<ArtworkMaterialOrTechniqueToFixSlugsDetails>;
  title: Scalars['String']['output'];
};

export type ArtworkMaterialOrTechniqueToFixSlugsDetails = {
  __typename?: 'ArtworkMaterialOrTechniqueToFixSlugsDetails';
  /**  Amount of Artworks that use this Material/Technique slug  */
  amountArtworks: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  wpEditUrl?: Maybe<Scalars['String']['output']>;
  wpPostId?: Maybe<Scalars['Int']['output']>;
};

export type ArtworkMaterialsOrTechniquesToFix = {
  __typename?: 'ArtworkMaterialsOrTechniquesToFix';
  amount: Scalars['Int']['output'];
  artworkSlugs: Array<Scalars['String']['output']>;
  artworks?: Maybe<Array<Artwork>>;
  /**  All items that are affected  */
  items?: Maybe<Array<ArtworkMaterialOrTechniqueToFix>>;
};


export type ArtworkMaterialsOrTechniquesToFixArtworksArgs = {
  currency?: InputMaybe<Currency>;
  unit?: InputMaybe<DimensionsUnit>;
};

export type ArtworkMaterialsStats = {
  __typename?: 'ArtworkMaterialsStats';
  total?: Maybe<Scalars['Int']['output']>;
};

export type ArtworkOriginalImage = {
  __typename?: 'ArtworkOriginalImage';
  /**  Aspect Ratio used for Corners  */
  aspectRatio: Scalars['Float']['output'];
  /**  Relative Points  */
  corners: SurfaceCornersUser;
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export enum ArtworkSortBy {
  /**  When (timestamp) the Artwork was explored, used for determining **explored** Artworks  */
  Explored = 'explored',
  /**  Last liked Artwork first, user-dependent  */
  LastLiked = 'lastLiked',
  /**  Newest Artwork first  */
  Newest = 'newest',
  /**  Oldest Artwork first  */
  Oldest = 'oldest',
  /**  Based on `randomNumberBySlug`, used for determining **unexplored** Artworks  */
  Random = 'random'
}

/** An Artwork Technique defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artworktechnique). */
export type ArtworkTechnique = {
  __typename?: 'ArtworkTechnique';
  /**  Amount of Artworks that use this Artwork Technique  */
  amountArtworks?: Maybe<Scalars['Int']['output']>;
  /**  Amount of Artworks (including Drafts) that use this Artwork Technique in the Gallery  */
  amountArtworksGallery?: Maybe<Scalars['Int']['output']>;
  /**  Artworks that use this Artwork Technique  */
  artworks?: Maybe<Array<Artwork>>;
  /**  WordPress Post Timestamp  */
  created?: Maybe<Scalars['Timestamp']['output']>;
  /**  Unique Technique Slug  */
  id: Scalars['String']['output'];
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  /**  WordPress Post Status  */
  status: WpStatus;
  /**  WordPress Post Title, language-dependent  */
  title: Scalars['String']['output'];
  /**  WordPress Post ID  */
  wpPostId?: Maybe<Scalars['Int']['output']>;
};


/** An Artwork Technique defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=artworktechnique). */
export type ArtworkTechniqueArtworksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtworkTechniquesStats = {
  __typename?: 'ArtworkTechniquesStats';
  total?: Maybe<Scalars['Int']['output']>;
};

export type ArtworkVariant = {
  __typename?: 'ArtworkVariant';
  /**  Language- & unit-dependent  */
  dimensionsReadable?: Maybe<Scalars['String']['output']>;
  /**  Artwork Variant height (**in mm**) */
  height: Scalars['Float']['output'];
  /**  Artwork Variant height (**in cm**) */
  heightCm: Scalars['Float']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  /**  Price in `priceCurrency` (Currency set in App/Backend)  */
  price?: Maybe<Scalars['Float']['output']>;
  priceCurrency?: Maybe<Currency>;
  priceEuro?: Maybe<Scalars['Float']['output']>;
  /**  Language- & currency-dependent  */
  priceReadable?: Maybe<Scalars['String']['output']>;
  /**  respects the `availabilityStatus` and returns either price, or 'Price on Request'  */
  priceReadableByStatus?: Maybe<Scalars['String']['output']>;
  /**  Artwork Variant width (**in mm**) */
  width: Scalars['Float']['output'];
  /**  Artwork Variant width (**in cm**) */
  widthCm: Scalars['Float']['output'];
};

export type ArtworksDefaultGallery = {
  __typename?: 'ArtworksDefaultGallery';
  galleriesPreviews?: Maybe<Array<GalleryPreview>>;
  latestAdditions?: Maybe<Array<Artwork>>;
};

/**  Values available in the Artworks Filter (Screen/Tab: Artworks)  */
export type ArtworksFilterValues = {
  __typename?: 'ArtworksFilterValues';
  /** 0.6.0 */
  amountMaterials: Scalars['Int']['output'];
  amountTechniques: Scalars['Int']['output'];
  colors: Array<ArtworkFilterValuesColor>;
  heightMaxMm?: Maybe<Scalars['Float']['output']>;
  heightMinMm?: Maybe<Scalars['Float']['output']>;
  materials: Array<ArtworkFilterValuesMaterial>;
  priceMaxEur?: Maybe<Scalars['Float']['output']>;
  priceMinEur?: Maybe<Scalars['Float']['output']>;
  techniques: Array<ArtworkFilterValuesTechnique>;
  widthMaxMm?: Maybe<Scalars['Float']['output']>;
  widthMinMm?: Maybe<Scalars['Float']['output']>;
};

export type ArtworksStats = {
  __typename?: 'ArtworksStats';
  draft: Scalars['Int']['output'];
  draftIds: Array<Scalars['String']['output']>;
  listed: Scalars['Int']['output'];
  listedIds: Array<Scalars['String']['output']>;
  protected: Scalars['Int']['output'];
  protectedIds: Array<Scalars['String']['output']>;
  stagingOnly: Scalars['Int']['output'];
  stagingOnlyIds: Array<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
  totalIds: Array<Scalars['String']['output']>;
  withColors: Scalars['Int']['output'];
  withColorsIds: Array<Scalars['String']['output']>;
  withoutColors: Scalars['Int']['output'];
  withoutColorsIds: Array<Scalars['String']['output']>;
};

/** Returned from [Queries.authTokenInfo]({{Queries.authTokenInfo}}) */
export type AuthTokenInfo = {
  __typename?: 'AuthTokenInfo';
  error?: Maybe<Scalars['String']['output']>;
  isValid: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  /**  in case `token` is valid: additional infos about token (uid, email, expiry time etc.)  */
  tokenInfos?: Maybe<AuthTokenInfoTokenInfos>;
  user?: Maybe<User>;
};

export type AuthTokenInfoTokenInfos = {
  __typename?: 'AuthTokenInfoTokenInfos';
  email?: Maybe<Scalars['String']['output']>;
  timeAuth: Scalars['Timestamp']['output'];
  timeAuthReadable: Scalars['String']['output'];
  timeExpires: Scalars['Timestamp']['output'];
  timeExpiresReadable: Scalars['String']['output'];
  timeIssued: Scalars['Timestamp']['output'];
  timeIssuedReadable: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type AvailabilityStati = {
  __typename?: 'AvailabilityStati';
  amountTotal: Scalars['Int']['output'];
  items: Array<AvailabilityStatusSingle>;
};

export type AvailabilityStatusSingle = {
  __typename?: 'AvailabilityStatusSingle';
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

/**
 * A Blog Entry defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=blog),
 *
 * Example: [**10 Tips for Finding the Perfect Work of Art for Your Home** (4495)](https://iazzu.com/wp/wp-admin/post.php?post=4495&action=edit)
 *
 * ### Sync Order:
 *
 * 1. `NBPTBlogEntry::clearCacheById()` →
 *
 * 2. `NBFirebase::updateBlogSha1()` → Firebase DB →
 *
 * 3. `/graphql/sha1/blog/slug/$slug/sha1` → Firebase DB Trigger →
 *
 * 4. `functions.onGraphQlSha1BlogWrite()` →
 *
 * 5. `graphqlModule.performSync ("blog/slug/$slug")` →
 *
 * 5. `GET /sync/blog/slug/:slug/:mode?`
 */
export type Blog = {
  __typename?: 'Blog';
  additionalImages?: Maybe<Array<Image>>;
  additionalImagesIds?: Maybe<Array<Scalars['String']['output']>>;
  additionalImagesWp?: Maybe<Array<ImageWp>>;
  /**  set in English Version of WP Post  */
  codesRelated: Array<Scalars['String']['output']>;
  /**  WordPress Post Content (language-dependent)  */
  content?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post Timestamp  */
  created?: Maybe<Scalars['Timestamp']['output']>;
  /**  Language-dependent  */
  createdReadable: Scalars['String']['output'];
  /**  Language-dependent, without `HH:MM`  */
  createdReadableWeb: Scalars['String']['output'];
  /** @deprecated TODO: Respect Post translations' Featured Images, it' currently taken from English Post version only  */
  featuredImage?: Maybe<Image>;
  /**
   *  Featured Image in size `u500`
   * @deprecated TODO: Respect Post translations' Featured Images, it' currently taken from English Post version only
   */
  featuredImageThumbUrl?: Maybe<Scalars['String']['output']>;
  /**
   *  Featured Image in size `u1500`
   * @deprecated TODO: Respect Post translations' Featured Images, it' currently taken from English Post version only
   */
  featuredImageUrl?: Maybe<Scalars['String']['output']>;
  /** @deprecated TODO: Respect Post translations' Featured Images, it' currently taken from English Post version only  */
  featuredImageWp?: Maybe<ImageWp>;
  galleriesBasics?: Maybe<Array<GalleryBasic>>;
  /**  always includes iazzu / `MyGallerySC`, optionally also connected with other Exhibitors  */
  galleriesCodes: Array<Scalars['String']['output']>;
  hasAdditionalImages: Scalars['Boolean']['output'];
  /**  Unique Blog Slug  */
  id: Scalars['String']['output'];
  /**
   * When finding a Blog via [`Queries.blogBySlug`]({{Queries.blogBySlug}}),
   * the language can be changed based on the found Blog when `args.langBySlug` is `true`.
   * Therefore, `langForResolvers` needs to be used for all resolvers.
   */
  langForResolvers: Scalars['String']['output'];
  /**  Links (language-dependent)  */
  links?: Maybe<Array<BlogLink>>;
  /**  e.g. `magazine/steff-blog-en` or `magazin/steff-blog-de`  */
  pathWeb: Scalars['String']['output'];
  /**  Related Blog Slugs, defined in English version  */
  relatedBlogSlugs?: Maybe<Array<Scalars['String']['output']>>;
  /**  Related Blog Items - only ones that are published and have a Featured Image are returned  */
  relatedBlogs?: Maybe<Array<Blog>>;
  /**  SEO Data used for e.g. in REST API for `GET /postdata`  */
  seoData?: Maybe<WebSeoData>;
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  /**  WordPress Post Slug in requested language  */
  slugInLang: Scalars['String']['output'];
  /**  WordPress Post Slug for every language  */
  slugs: SlugsInLangs;
  /**  Original Article Source(s), defined in English version  */
  sources?: Maybe<Array<BlogLink>>;
  /**  WordPress Post Status  */
  status: WpStatus;
  /**  WordPress Post Title (language-dependent)  */
  title: Scalars['String']['output'];
  userLiked?: Maybe<Scalars['Boolean']['output']>;
  userLikedTime?: Maybe<Scalars['Timestamp']['output']>;
  userLikedTimeReadable?: Maybe<Scalars['String']['output']>;
  userSeen?: Maybe<Scalars['Boolean']['output']>;
  userSeenTime?: Maybe<Scalars['Timestamp']['output']>;
  userSeenTimeReadable?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post ID **of English post**  */
  wpPostId?: Maybe<Scalars['Int']['output']>;
};


/**
 * A Blog Entry defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=blog),
 *
 * Example: [**10 Tips for Finding the Perfect Work of Art for Your Home** (4495)](https://iazzu.com/wp/wp-admin/post.php?post=4495&action=edit)
 *
 * ### Sync Order:
 *
 * 1. `NBPTBlogEntry::clearCacheById()` →
 *
 * 2. `NBFirebase::updateBlogSha1()` → Firebase DB →
 *
 * 3. `/graphql/sha1/blog/slug/$slug/sha1` → Firebase DB Trigger →
 *
 * 4. `functions.onGraphQlSha1BlogWrite()` →
 *
 * 5. `graphqlModule.performSync ("blog/slug/$slug")` →
 *
 * 5. `GET /sync/blog/slug/:slug/:mode?`
 */
export type BlogContentArgs = {
  charsMax?: InputMaybe<Scalars['Int']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
};

/**  Specified in the [`blogs` query]({{Queries.blogs}})  */
export enum BlogFilter {
  /**  for debugging purposes only: also returns unpublished blog entries  */
  Debug = 'debug',
  /**  Liked by user via [`setUserBlogLiked`]({{Mutations.setUserBlogLiked}})  */
  Liked = 'liked',
  /**  for Website: don't show Blogs without Featured Image  */
  Web = 'web'
}

export type BlogLink = {
  __typename?: 'BlogLink';
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

/**  What a returned Array of [Blog Entries]({{Types.Blog}}) should be sorted like  */
export enum BlogSortBy {
  /**  last liked first */
  LastLiked = 'lastLiked',
  /**  last published (default)  */
  Newest = 'newest',
  /**  first published  */
  Oldest = 'oldest'
}

export type BranchLink = {
  __typename?: 'BranchLink';
  appLinkUrl?: Maybe<Scalars['String']['output']>;
  branchShareLinkKey?: Maybe<Scalars['String']['output']>;
  contentFound?: Maybe<Scalars['Boolean']['output']>;
  debug?: Maybe<BranchLinkDebugData>;
  matchId?: Maybe<Scalars['String']['output']>;
  qrData?: Maybe<BranchLinkQrData>;
  qrImageUrl?: Maybe<Scalars['String']['output']>;
  seoData?: Maybe<BranchLinkSeoData>;
};

export type BranchLinkDebugData = {
  __typename?: 'BranchLinkDebugData';
  /**  The individual actions performed when requesting the Branch Link */
  actions: Array<Scalars['String']['output']>;
  /**  Amount of actions performed when requesting the Branch Link  */
  amountActions: Scalars['Int']['output'];
  /**  Equal to `cacheGroupHash`  */
  branchKey?: Maybe<Scalars['String']['output']>;
  /**  Title of the Branch Link (same as `seoData.ogTitle`)  */
  branchTitle?: Maybe<Scalars['String']['output']>;
  branchUrlInfosDataString?: Maybe<Scalars['String']['output']>;
  /**  Human-readable string that's the base for `cacheGroupHash`  */
  cacheGroup?: Maybe<Scalars['String']['output']>;
  /**  Alias of the Branch Link & Database Item ID, e.g. `osteroni` for a gallery, or `k4noe9hkabk0` for the artist `steff-mueller` in German  */
  cacheGroupHash?: Maybe<Scalars['String']['output']>;
  /**  Unique Code of the Gallery that will be activated when opening the Branch Link  */
  galleryCode?: Maybe<Scalars['String']['output']>;
  /**  Unique Slug of the Gallery that will be activated when opening the Branch Link  */
  gallerySlug?: Maybe<Scalars['String']['output']>;
  rescrapeUrlFacebookResultString?: Maybe<Scalars['String']['output']>;
  updateQrCodeResultString?: Maybe<Scalars['String']['output']>;
};

export type BranchLinkQrData = {
  __typename?: 'BranchLinkQrData';
  filename?: Maybe<Scalars['String']['output']>;
  targetUrl?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type BranchLinkSeoData = {
  __typename?: 'BranchLinkSeoData';
  ogDescription?: Maybe<Scalars['String']['output']>;
  ogImage?: Maybe<Scalars['String']['output']>;
  ogTitle?: Maybe<Scalars['String']['output']>;
};

export type BranchUrlInfos = {
  __typename?: 'BranchUrlInfos';
  alias?: Maybe<Scalars['String']['output']>;
  dataString: Scalars['String']['output'];
  isNew: Scalars['Boolean']['output'];
};

/**  Reasons for why an Artwork **cannot** be converted from WP to an User Artwork  */
export enum CantBeConvertedFromWpReason {
  /**  Post has at least one missing Additional Image  */
  AdditionalImageMissing = 'AdditionalImageMissing',
  /**  Artwork has already been converted from WP → User Artwork before  */
  AlreadyConverted = 'AlreadyConverted',
  /**  Artwork always was a User Artwork  */
  CreatedAsUserArtwork = 'CreatedAsUserArtwork',
  /**  Post has no valid Featured Image  */
  FeaturedImageMissing = 'FeaturedImageMissing',
  /**  Post has more than one Gallery assigned  */
  MoreThanOneAssignedGallery = 'MoreThanOneAssignedGallery',
  /**  Post has no Gallery assigned  */
  NoAssignedGallery = 'NoAssignedGallery',
  /**  Post has non-JPEG Featured Image (e.g. PNG)  */
  NonJpegImageFound = 'NonJpegImageFound',
  /**  Post can't be found  */
  PostSlugMissing = 'PostSlugMissing',
  /**  Post ID does not resolve to Artwork  */
  PostTypeWrong = 'PostTypeWrong'
}

export enum ClientPlatform {
  Android = 'android',
  Api = 'api',
  Ios = 'ios',
  Node = 'node',
  Php = 'php',
  Unknown = 'unknown',
  Web = 'web'
}

/** Used in [`Gallery.contact`]({{Types.Gallery}}) */
export type Contact = {
  __typename?: 'Contact';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  links?: Maybe<Array<Link>>;
  name?: Maybe<Scalars['String']['output']>;
  parentType?: Maybe<ContactParentType>;
  phone?: Maybe<Scalars['String']['output']>;
};

export enum ContactParentType {
  Artist = 'ARTIST',
  Gallery = 'GALLERY'
}

export type Countries = {
  __typename?: 'Countries';
  amountTotal: Scalars['Int']['output'];
  items: Array<CountrySingle>;
};

export type CountrySingle = {
  __typename?: 'CountrySingle';
  /**  2-digit country code, upper-case  */
  code: Scalars['String']['output'];
  /**  Title in the requested language (fallback: English)  */
  title: Scalars['String']['output'];
};

/**  3-digit Currency Code, e.g. `EUR` or `USD` (see https://www.iban.com/currency-codes)  */
export enum Currency {
  /**  Australian Dollar  */
  Aud = 'AUD',
  /**  Bitcoin  */
  Btc = 'BTC',
  /**  Canadian Dollar  */
  Cad = 'CAD',
  /**  Swiss Franc  */
  Chf = 'CHF',
  /**  Yuan (China)  */
  Cny = 'CNY',
  /**  Danish Krone  */
  Dkk = 'DKK',
  /**  Euro  */
  Eur = 'EUR',
  /**  Pound Sterling  */
  Gbp = 'GBP',
  /**  Yen (Japan)  */
  Jpy = 'JPY',
  /**  Won (Korea)  */
  Krw = 'KRW',
  /**  Norwegian Krone  */
  Nok = 'NOK',
  /**  Russian Ruble  */
  Rub = 'RUB',
  /**  Swedish Krona  */
  Sek = 'SEK',
  /**  US Dollar  */
  Usd = 'USD'
}

export type CurrencyConverted = {
  __typename?: 'CurrencyConverted';
  currencyKey: Currency;
  /**  Amount of digits after comma  */
  decimalScale: Scalars['Int']['output'];
  values: Array<CurrencyConvertedValue>;
};

export type CurrencyConvertedValue = {
  __typename?: 'CurrencyConvertedValue';
  exact: Scalars['Float']['output'];
  rounded: Scalars['Float']['output'];
  string: Scalars['String']['output'];
};

export type DateStartEndParts = {
  __typename?: 'DateStartEndParts';
  endR?: Maybe<Scalars['String']['output']>;
  parts: Array<Scalars['String']['output']>;
  startR: Scalars['String']['output'];
};

/**  Response returned from query [`debugValue`]({{Queries.debugValue}})  */
export type DebugValue = {
  __typename?: 'DebugValue';
  success?: Maybe<Scalars['Boolean']['output']>;
  /**
   *  If existing, the value for the given `key`
   * # " The unique key from the vars "
   * # key: String!
   */
  value?: Maybe<Scalars['String']['output']>;
};

/**  Metric (`cm`) or Imperial (`inch`)  */
export enum DimensionsUnit {
  /**  Centimeters (Metric)  */
  Cm = 'cm',
  /**  Inches (Imperial)  */
  Inch = 'inch'
}

/**
 * A Gallery Event defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent),
 * Example: [**The End of the World** (40756)](https://iazzu.com/wp/wp-admin/post.php?post=40756&action=edit)
 *
 * ### Input: WP
 *
 * 1. Events are managed in the [WP Backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent).
 *
 * 2. When Event is saved, it is individually synced by calling the `GET /sync/event/slug/:slug/:mode?` Express endpoint.
 *
 *     1. `NBFirebase::updateEventSha1()` → Firebase DB →
 *     2. `/graphql/sha1/event/slug/$slug/sha1` → Firebase DB Trigger →
 *     3. `functions.onGraphQlSha1EventWrite()` →
 *     4. `graphqlModule.performSync("event/slug/$slug")` →
 *     5. `GET /sync/event/slug/:slug/:mode?`
 *
 * ### Output: App
 *
 * 1. **Home Tab > Stream**: shows Events (amidst other Stream Items) in list, items sorted by newest first
 *
 * 2. **Home Tab > Events Tab**: shows Events for the currently active Gallery, optionally filtered
 *
 * 3. **Profile Tab > Liked Events**: shows User-liked Events, independent of currently active Gallery, sorted by last liked
 */
export type Event = {
  __typename?: 'Event';
  additionalImages?: Maybe<Array<Image>>;
  additionalImagesIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**  Additional Images in size `u500`  */
  additionalImagesThumbUrls?: Maybe<Array<Scalars['String']['output']>>;
  /**  Additional Images in size `u1500`  */
  additionalImagesUrls?: Maybe<Array<Scalars['String']['output']>>;
  additionalImagesWp?: Maybe<Array<ImageWp>>;
  artists?: Maybe<Array<Artist>>;
  artistsIds?: Maybe<Array<Scalars['String']['output']>>;
  /**  Event's **Artist Title(s)**, separated by `,` and `&` if necessary  */
  artistsTitles?: Maybe<Scalars['String']['output']>;
  /**  see Field Group 'Gallery Event (Item)' - https://iazzu.com/wp/wp-admin/post.php?post=12134&action=edit  */
  categories: Array<Scalars['String']['output']>;
  /**  Language-dependent  */
  categoriesReadable: Array<Scalars['String']['output']>;
  /**  WordPress Post Content (language-dependent)  */
  content?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post Content, language-dependent (same as `content` in HTML)  */
  contentNew?: Maybe<Scalars['String']['output']>;
  /**  Content (in **HTML format**) in all available languages  */
  contentsHtml: StringInLangs;
  /**  Content (in **Markdown format**) in all available languages  */
  contentsMd: StringInLangs;
  /**  based on WordPress Post Timestamp  */
  created: Scalars['Timestamp']['output'];
  /**  Firebase User ID of User who created this Event (system@iazzu.com)  */
  createdById?: Maybe<Scalars['String']['output']>;
  /**  Language-dependent, e.g. `Montag, 23. Juni 2025, 19:32`  */
  createdReadable: Scalars['String']['output'];
  /**  Language-dependent, e.g. `23. Juni 2025, 19:32`  */
  createdReadableShort: Scalars['String']['output'];
  dateEnd?: Maybe<Scalars['Timestamp']['output']>;
  dateEndCalendar?: Maybe<Scalars['Timestamp']['output']>;
  /**  Language-dependent  */
  dateEndCalendarReadable?: Maybe<Scalars['String']['output']>;
  /**  Language-dependent  */
  dateEndReadable?: Maybe<Scalars['String']['output']>;
  /**  Start date of the Event, as a JS Timestamp  */
  dateStart: Scalars['Timestamp']['output'];
  /**
   * Displayable values for the date range, e.g.
   *
   * - `["Do. 27. März, 12:00"]`, or
   *
   * - `["Do. 27. März, 12:00", "Fr. 28. März, 14:00"]`, or
   *
   * - `["Do. 27. März 2024, 12:00", "Fr. 28. März 2024, 14:00"]`
   */
  dateStartEndParts?: Maybe<Array<Scalars['String']['output']>>;
  /**  Language-dependent  */
  dateStartReadable: Scalars['String']['output'];
  era: EventEra;
  eraIsFuture: Scalars['Boolean']['output'];
  eraIsPast: Scalars['Boolean']['output'];
  eraIsPresent: Scalars['Boolean']['output'];
  externalOrganizer?: Maybe<ExternalOrganizer>;
  featuredImage?: Maybe<Image>;
  /**  Featured Image in size `u500`  */
  featuredImageThumbUrl?: Maybe<Scalars['String']['output']>;
  /**  Featured Image in size `u1500`  */
  featuredImageUrl?: Maybe<Scalars['String']['output']>;
  featuredImageWp?: Maybe<ImageWp>;
  galleriesBasics?: Maybe<Array<GalleryBasic>>;
  galleriesCodes: Array<Scalars['String']['output']>;
  /**  In case the Event is in OVR Galleries, return those Galleries  */
  galleriesOvr?: Maybe<Array<Gallery>>;
  galleriesProtectedCodes?: Maybe<Array<Scalars['String']['output']>>;
  hasAdditionalImages: Scalars['Boolean']['output'];
  /**  Unique Event Slug  */
  id: Scalars['String']['output'];
  inListedGallery?: Maybe<Scalars['Boolean']['output']>;
  inProtectedGallery?: Maybe<Scalars['Boolean']['output']>;
  isCourse?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  /**  Language-dependent  */
  locationReadable?: Maybe<Scalars['String']['output']>;
  locationSearch?: Maybe<LocationSearch>;
  openingHours?: Maybe<Array<OpeningHoursEntry>>;
  /**  Language-dependent  */
  openingHoursLines?: Maybe<Array<Scalars['String']['output']>>;
  republished: Scalars['Boolean']['output'];
  /**  SEO Data used for e.g. in REST API for `GET /postdata`  */
  seoData?: Maybe<WebSeoData>;
  showLocationInListItem: Scalars['Boolean']['output'];
  showOpeningHours: Scalars['Boolean']['output'];
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  stagingOnly?: Maybe<Scalars['Boolean']['output']>;
  /**  WordPress Post Status  */
  status: WpStatus;
  /**  Language-dependent  */
  timeRangeReadable: Scalars['String']['output'];
  timeRanges: Array<EventFilterTimeRange>;
  /**  WordPress Post Title  */
  title: Scalars['String']['output'];
  /**  User-dependent  */
  userAccessData?: Maybe<ProtectedContentUserAccessData>;
  /**  User-dependent  */
  userCanAccessProtectedContent?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userCanOrCantAccessProtectedContentReason?: Maybe<Scalars['String']['output']>;
  userLiked?: Maybe<Scalars['Boolean']['output']>;
  userLikedTime?: Maybe<Scalars['Timestamp']['output']>;
  userLikedTimeReadable?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userManagesGallery?: Maybe<Scalars['Boolean']['output']>;
  userSeen?: Maybe<Scalars['Boolean']['output']>;
  userSeenTime?: Maybe<Scalars['Timestamp']['output']>;
  userSeenTimeReadable?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post ID  */
  wpPostId: Scalars['Int']['output'];
};


/**
 * A Gallery Event defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent),
 * Example: [**The End of the World** (40756)](https://iazzu.com/wp/wp-admin/post.php?post=40756&action=edit)
 *
 * ### Input: WP
 *
 * 1. Events are managed in the [WP Backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent).
 *
 * 2. When Event is saved, it is individually synced by calling the `GET /sync/event/slug/:slug/:mode?` Express endpoint.
 *
 *     1. `NBFirebase::updateEventSha1()` → Firebase DB →
 *     2. `/graphql/sha1/event/slug/$slug/sha1` → Firebase DB Trigger →
 *     3. `functions.onGraphQlSha1EventWrite()` →
 *     4. `graphqlModule.performSync("event/slug/$slug")` →
 *     5. `GET /sync/event/slug/:slug/:mode?`
 *
 * ### Output: App
 *
 * 1. **Home Tab > Stream**: shows Events (amidst other Stream Items) in list, items sorted by newest first
 *
 * 2. **Home Tab > Events Tab**: shows Events for the currently active Gallery, optionally filtered
 *
 * 3. **Profile Tab > Liked Events**: shows User-liked Events, independent of currently active Gallery, sorted by last liked
 */
export type EventAdditionalImagesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * A Gallery Event defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent),
 * Example: [**The End of the World** (40756)](https://iazzu.com/wp/wp-admin/post.php?post=40756&action=edit)
 *
 * ### Input: WP
 *
 * 1. Events are managed in the [WP Backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent).
 *
 * 2. When Event is saved, it is individually synced by calling the `GET /sync/event/slug/:slug/:mode?` Express endpoint.
 *
 *     1. `NBFirebase::updateEventSha1()` → Firebase DB →
 *     2. `/graphql/sha1/event/slug/$slug/sha1` → Firebase DB Trigger →
 *     3. `functions.onGraphQlSha1EventWrite()` →
 *     4. `graphqlModule.performSync("event/slug/$slug")` →
 *     5. `GET /sync/event/slug/:slug/:mode?`
 *
 * ### Output: App
 *
 * 1. **Home Tab > Stream**: shows Events (amidst other Stream Items) in list, items sorted by newest first
 *
 * 2. **Home Tab > Events Tab**: shows Events for the currently active Gallery, optionally filtered
 *
 * 3. **Profile Tab > Liked Events**: shows User-liked Events, independent of currently active Gallery, sorted by last liked
 */
export type EventContentArgs = {
  charsMax?: InputMaybe<Scalars['Int']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * A Gallery Event defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent),
 * Example: [**The End of the World** (40756)](https://iazzu.com/wp/wp-admin/post.php?post=40756&action=edit)
 *
 * ### Input: WP
 *
 * 1. Events are managed in the [WP Backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent).
 *
 * 2. When Event is saved, it is individually synced by calling the `GET /sync/event/slug/:slug/:mode?` Express endpoint.
 *
 *     1. `NBFirebase::updateEventSha1()` → Firebase DB →
 *     2. `/graphql/sha1/event/slug/$slug/sha1` → Firebase DB Trigger →
 *     3. `functions.onGraphQlSha1EventWrite()` →
 *     4. `graphqlModule.performSync("event/slug/$slug")` →
 *     5. `GET /sync/event/slug/:slug/:mode?`
 *
 * ### Output: App
 *
 * 1. **Home Tab > Stream**: shows Events (amidst other Stream Items) in list, items sorted by newest first
 *
 * 2. **Home Tab > Events Tab**: shows Events for the currently active Gallery, optionally filtered
 *
 * 3. **Profile Tab > Liked Events**: shows User-liked Events, independent of currently active Gallery, sorted by last liked
 */
export type EventDateStartEndPartsArgs = {
  type?: InputMaybe<EventDateStartEndPartsType>;
};


/**
 * A Gallery Event defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent),
 * Example: [**The End of the World** (40756)](https://iazzu.com/wp/wp-admin/post.php?post=40756&action=edit)
 *
 * ### Input: WP
 *
 * 1. Events are managed in the [WP Backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent).
 *
 * 2. When Event is saved, it is individually synced by calling the `GET /sync/event/slug/:slug/:mode?` Express endpoint.
 *
 *     1. `NBFirebase::updateEventSha1()` → Firebase DB →
 *     2. `/graphql/sha1/event/slug/$slug/sha1` → Firebase DB Trigger →
 *     3. `functions.onGraphQlSha1EventWrite()` →
 *     4. `graphqlModule.performSync("event/slug/$slug")` →
 *     5. `GET /sync/event/slug/:slug/:mode?`
 *
 * ### Output: App
 *
 * 1. **Home Tab > Stream**: shows Events (amidst other Stream Items) in list, items sorted by newest first
 *
 * 2. **Home Tab > Events Tab**: shows Events for the currently active Gallery, optionally filtered
 *
 * 3. **Profile Tab > Liked Events**: shows User-liked Events, independent of currently active Gallery, sorted by last liked
 */
export type EventFeaturedImageArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * A Gallery Event defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent),
 * Example: [**The End of the World** (40756)](https://iazzu.com/wp/wp-admin/post.php?post=40756&action=edit)
 *
 * ### Input: WP
 *
 * 1. Events are managed in the [WP Backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent).
 *
 * 2. When Event is saved, it is individually synced by calling the `GET /sync/event/slug/:slug/:mode?` Express endpoint.
 *
 *     1. `NBFirebase::updateEventSha1()` → Firebase DB →
 *     2. `/graphql/sha1/event/slug/$slug/sha1` → Firebase DB Trigger →
 *     3. `functions.onGraphQlSha1EventWrite()` →
 *     4. `graphqlModule.performSync("event/slug/$slug")` →
 *     5. `GET /sync/event/slug/:slug/:mode?`
 *
 * ### Output: App
 *
 * 1. **Home Tab > Stream**: shows Events (amidst other Stream Items) in list, items sorted by newest first
 *
 * 2. **Home Tab > Events Tab**: shows Events for the currently active Gallery, optionally filtered
 *
 * 3. **Profile Tab > Liked Events**: shows User-liked Events, independent of currently active Gallery, sorted by last liked
 */
export type EventOpeningHoursLinesArgs = {
  raw?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * A Gallery Event defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent),
 * Example: [**The End of the World** (40756)](https://iazzu.com/wp/wp-admin/post.php?post=40756&action=edit)
 *
 * ### Input: WP
 *
 * 1. Events are managed in the [WP Backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=galleryevent).
 *
 * 2. When Event is saved, it is individually synced by calling the `GET /sync/event/slug/:slug/:mode?` Express endpoint.
 *
 *     1. `NBFirebase::updateEventSha1()` → Firebase DB →
 *     2. `/graphql/sha1/event/slug/$slug/sha1` → Firebase DB Trigger →
 *     3. `functions.onGraphQlSha1EventWrite()` →
 *     4. `graphqlModule.performSync("event/slug/$slug")` →
 *     5. `GET /sync/event/slug/:slug/:mode?`
 *
 * ### Output: App
 *
 * 1. **Home Tab > Stream**: shows Events (amidst other Stream Items) in list, items sorted by newest first
 *
 * 2. **Home Tab > Events Tab**: shows Events for the currently active Gallery, optionally filtered
 *
 * 3. **Profile Tab > Liked Events**: shows User-liked Events, independent of currently active Gallery, sorted by last liked
 */
export type EventSeoDataArgs = {
  currency?: InputMaybe<Currency>;
  lang?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<DimensionsUnit>;
};

export type EventCategories = {
  __typename?: 'EventCategories';
  amountTotal: Scalars['Int']['output'];
  items: Array<EventCategory>;
};

export type EventCategory = {
  __typename?: 'EventCategory';
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export enum EventDateStartEndPartsType {
  /** Long form, including week day (e.g. `"Donnertag, 2. Oktober 2025"`) */
  Full = 'full',
  /** Shortest form possible, including week day (e.g. `"Do., 2. Okt. 2025"`) */
  Short = 'short'
}

export enum EventEra {
  Future = 'future',
  Past = 'past',
  Present = 'present',
  Unknown = 'unknown'
}

export enum EventFilter {
  /**  Has start date after now  */
  Future = 'future',
  /**  Liked by user via [`setUserEventLiked`]({{Mutations.setUserEventLiked}})  */
  Liked = 'liked',
  /**  Has end date, which is before now  */
  Past = 'past',
  /**
   * Either has start date before now and end date after now,
   *
   * or doesn't have an end date, but start date is before now.
   */
  Present = 'present'
}

export enum EventFilterTimeRange {
  Closingsoon = 'closingsoon',
  Future = 'future',
  Openingsoon = 'openingsoon',
  Past = 'past',
  Today = 'today',
  Tomorrow = 'tomorrow'
}

export type EventFilterValueCategory = {
  __typename?: 'EventFilterValueCategory';
  amount?: Maybe<Scalars['Int']['output']>;
  value: Scalars['String']['output'];
};

export type EventFilterValueCityEntry = {
  __typename?: 'EventFilterValueCityEntry';
  amount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EventFilterValueTimeRange = {
  __typename?: 'EventFilterValueTimeRange';
  amount?: Maybe<Scalars['Int']['output']>;
  value: EventFilterTimeRange;
};

export enum EventQueryMode {
  All = 'all',
  Courses = 'courses',
  Exhibitions = 'exhibitions'
}

/**  What a returned Array of [Events]({{Types.Event}}) should be sorted like  */
export enum EventSortBy {
  /**  last created first  */
  Created = 'created',
  /**  last liked first */
  LastLiked = 'lastLiked',
  /**  (default)  */
  Newest = 'newest',
  Oldest = 'oldest'
}

export type EventsFilterValues = {
  __typename?: 'EventsFilterValues';
  categories: Array<EventFilterValueCategory>;
  cities: Array<EventFilterValueCityEntry>;
  timeRanges: Array<EventFilterValueTimeRange>;
};

export type EventsStats = {
  __typename?: 'EventsStats';
  listed: Scalars['Int']['output'];
  listedIds: Array<Scalars['String']['output']>;
  protected: Scalars['Int']['output'];
  protectedIds: Array<Scalars['String']['output']>;
  stagingOnly: Scalars['Int']['output'];
  stagingOnlyIds: Array<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
  totalIds: Array<Scalars['String']['output']>;
};

/** In case this [`Event`]({{Types.Event}}) is not assigned to a Gallery other than iazzu, this holds infos about the External Organizer */
export type ExternalOrganizer = {
  __typename?: 'ExternalOrganizer';
  image?: Maybe<Image>;
  imageThumbUrl?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  imageWp?: Maybe<ImageWp>;
  title?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type GalleriesStats = {
  __typename?: 'GalleriesStats';
  listed: Scalars['Int']['output'];
  listedIds: Array<Scalars['String']['output']>;
  protected: Scalars['Int']['output'];
  protectedIds: Array<Scalars['String']['output']>;
  stagingOnly: Scalars['Int']['output'];
  stagingOnlyIds: Array<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
  totalIds: Array<Scalars['String']['output']>;
  withoutArtists?: Maybe<Scalars['Int']['output']>;
  withoutArtworks?: Maybe<Scalars['Int']['output']>;
};

/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type Gallery = {
  __typename?: 'Gallery';
  additionalImages?: Maybe<Array<Image>>;
  additionalImagesIds?: Maybe<Array<Scalars['String']['output']>>;
  additionalImagesWp?: Maybe<Array<ImageWp>>;
  /**  Total amount of Artists in `DRAFT` status  */
  amountArtists?: Maybe<Scalars['Int']['output']>;
  /**  Total amount of Artworks, **not including** Artworks in `DRAFT` status  */
  amountArtworks?: Maybe<Scalars['Int']['output']>;
  /**  Total amount of Artworks in `DRAFT` status  */
  amountArtworksDraft?: Maybe<Scalars['Int']['output']>;
  /**  Total amount of Events  */
  amountEvents?: Maybe<Scalars['Int']['output']>;
  amountFollowers?: Maybe<Scalars['Int']['output']>;
  amountPublicWalls?: Maybe<Scalars['Int']['output']>;
  artists?: Maybe<Array<Artist>>;
  /**  For Screen 'Artworks'  */
  artworkCategories?: Maybe<Array<ArtworkCategory>>;
  /**  For resolvers only  */
  artworkCategoriesSlugs?: Maybe<Array<Scalars['String']['output']>>;
  /**  All materials, but with `amountArtworksGallery` set to the amount in this very Gallery  */
  artworkMaterials?: Maybe<Array<ArtworkMaterial>>;
  /**  All materials, but with `amountArtworksGallery` set to the amount in this very Gallery  */
  artworkTechniques?: Maybe<Array<ArtworkTechnique>>;
  artworks?: Maybe<Array<Artwork>>;
  artworksFilterValues?: Maybe<ArtworksFilterValues>;
  artworksIds: Array<Scalars['String']['output']>;
  billing?: Maybe<GalleryBilling>;
  brandingInfos?: Maybe<GalleryBrandingInfos>;
  /**  Unique Gallery Code (equal to `id`)  */
  code: Scalars['String']['output'];
  /**  Codes that should be auto-added when this Gallery is activated in app  */
  codesAutoAdd?: Maybe<Array<Scalars['String']['output']>>;
  contact?: Maybe<Contact>;
  /**  WordPress Post Content (language-dependent)  */
  content?: Maybe<Scalars['String']['output']>;
  /**  Content (in **HTML format**) in all available languages  */
  contentsHtml: StringInLangs;
  /**  Content (in **Markdown format**) in all available languages  */
  contentsMd: StringInLangs;
  /**  WordPress Post Timestamp  */
  created: Scalars['Timestamp']['output'];
  /**  Language-dependent  */
  createdReadable: Scalars['String']['output'];
  defaultCurrency: Currency;
  /**  If `true`, gallery code is `MyGallerySC`  */
  defaultGallery: Scalars['Boolean']['output'];
  /**  If `true`, no Push Notifications will be sent and Analytics won't show Registered/Push Receivers  */
  dontSendPushes?: Maybe<Scalars['Boolean']['output']>;
  /**  If `true`, app never shows artwork prices  */
  dontShowArtworkPrices: Scalars['Boolean']['output'];
  /**  If `true`, enables embedding of OVR page  */
  embedEnabled: Scalars['Boolean']['output'];
  /**  If `true`, wall renders can be shared to Instagram  */
  enableShareToInstagram?: Maybe<Scalars['Boolean']['output']>;
  events?: Maybe<Array<Maybe<Event>>>;
  /**  If `false`, app doesn't allow Public Wall creation of anybody but admins or managers  */
  everybodyCanCreatePublicWalls?: Maybe<Scalars['Boolean']['output']>;
  featuredImage?: Maybe<Image>;
  featuredImageThumbRectUrl?: Maybe<Scalars['String']['output']>;
  /**  Featured Image in size `u500`  */
  featuredImageThumbUrl?: Maybe<Scalars['String']['output']>;
  /**  Featured Image in default size `u1500`  */
  featuredImageUrl?: Maybe<Scalars['String']['output']>;
  featuredImageWp?: Maybe<ImageWp>;
  firstLocation?: Maybe<Location>;
  followers?: Maybe<Array<Maybe<UserWithMetaTimesAndTicks>>>;
  galleryPackage?: Maybe<GalleryPackage>;
  galleryPackageId?: Maybe<Scalars['String']['output']>;
  /**  Only relevant if `singleArtist` is `true`  */
  gender: GalleryGender;
  hasAdditionalImages: Scalars['Boolean']['output'];
  /**  For Screen 'Artworks'  */
  hasArtworksWithMissingCategories?: Maybe<Scalars['Boolean']['output']>;
  /**  If `true`, app never shows exact address the location(s)  */
  hideExactAddress: Scalars['Boolean']['output'];
  /**  If set, changes label of first tab, language-dependent   */
  homeTabsFirstTabLabelOverride: Scalars['String']['output'];
  /**  Unique Gallery Code  */
  id: Scalars['String']['output'];
  lastArtistCreated?: Maybe<Scalars['Date']['output']>;
  /**  Language-dependent  */
  lastArtistCreatedReadable?: Maybe<Scalars['String']['output']>;
  lastArtworkCreated?: Maybe<Scalars['Date']['output']>;
  /**  Language-dependent  */
  lastArtworkCreatedReadable?: Maybe<Scalars['String']['output']>;
  lastEventCreated?: Maybe<Scalars['Date']['output']>;
  /**  Language-dependent  */
  lastEventCreatedReadable?: Maybe<Scalars['String']['output']>;
  lastUpdateCreated?: Maybe<Scalars['Date']['output']>;
  /**  Language-dependent  */
  lastUpdateCreatedReadable?: Maybe<Scalars['String']['output']>;
  /**  Depending on branding infos  */
  launchImage?: Maybe<Image>;
  launchLogoImageUrl?: Maybe<Scalars['String']['output']>;
  /**  If `true`, also shows up in iazzu Gallery (in 'Artists' Tab)  */
  listed: Scalars['Boolean']['output'];
  listedArtistsSlugs?: Maybe<Array<Scalars['String']['output']>>;
  /**  For resolvers only  */
  locations?: Maybe<Array<Location>>;
  /**  Emails of all managers of this gallery  */
  managerEmails?: Maybe<Array<Scalars['String']['output']>>;
  /**  User IDs of all managers of this gallery  */
  managerUids?: Maybe<Array<Scalars['String']['output']>>;
  newestArtwork?: Maybe<Artwork>;
  newestPublicWall?: Maybe<Wall>;
  preferrabilityFactor?: Maybe<Scalars['Float']['output']>;
  /**  Set in WordPress backend  */
  protected: Scalars['Boolean']['output'];
  /**  First used in `iazzu-walls`  */
  publicSurfaces?: Maybe<Array<Surface>>;
  publicWalls?: Maybe<Array<Wall>>;
  /**  Link to QR-Code image that opens Gallery when scanned with a Smartphone camera  */
  qrCode: Scalars['String']['output'];
  /**  SEO Data used for e.g. in REST API for `GET /postdata`  */
  seoData: WebSeoData;
  /**  If `false`, app doesn't show the 'Events' tab in the Home Screen  */
  showEventsTab: Scalars['Boolean']['output'];
  /**  If `true`, exhibitor is shown on OVR page  */
  shownInOvr: Scalars['Boolean']['output'];
  /**  If `true`, app activates 'single-artist' mode  */
  singleArtist: Scalars['Boolean']['output'];
  /**  `u`, `m`, `f`, `p`, `n`  */
  singleArtistGender?: Maybe<Scalars['String']['output']>;
  /**  Only set `singleArtist` is `true`  */
  singleArtistSlug?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post Slug  */
  slug: Scalars['String']['output'];
  /**  If `true`, never shows up in App Store Version  */
  stagingOnly: Scalars['Boolean']['output'];
  /**  WordPress Post Status  */
  status: WpStatus;
  /**  Tab bar label **overrides**, language-dependent  */
  tabBarLabels?: Maybe<Array<GalleryTabBarLabel>>;
  /**  Tab bar labels in all languages  */
  tabBarLabelsAllLangs: TabBarLabelsInLangs;
  /**  WordPress Post Title  */
  title: Scalars['String']['output'];
  /**  If `true`, use custom tab bar labels specified in WordPress  */
  useTabBarLabels: Scalars['Boolean']['output'];
  /**  User-dependent  */
  userAccessData?: Maybe<ProtectedContentUserAccessData>;
  /**  User-dependent  */
  userCanAccessProtectedContent?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userCanOrCantAccessProtectedContentReason?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userFavoritedGallery?: Maybe<Scalars['Date']['output']>;
  /**  User-dependent  */
  userFavoritedGalleryReadable?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userFirstFollowedGallery?: Maybe<Scalars['Date']['output']>;
  /**  User-dependent  */
  userFirstFollowedGalleryReadable?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userFollowsGallery?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userGalleryTicks?: Maybe<Scalars['Int']['output']>;
  /**  User-dependent  */
  userLastVisitedGallery?: Maybe<Scalars['Date']['output']>;
  /**  User-dependent  */
  userLastVisitedGalleryReadable?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userManagesGallery?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userManagesGalleryProtection?: Maybe<Scalars['Boolean']['output']>;
  webLogoImageUrl?: Maybe<Scalars['String']['output']>;
  /**  WordPress Post ID  */
  wpPostId: Scalars['Int']['output'];
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryAdditionalImagesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryAmountFollowersArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  onlyRegistered?: InputMaybe<Scalars['Boolean']['input']>;
  onlyWithFcmTokens?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<GalleryFollowersSortBy>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryArtistsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ArtistSortBy>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryArtworkCategoriesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryArtworksArgs = {
  currency?: InputMaybe<Currency>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ArtworkSortBy>;
  unit?: InputMaybe<DimensionsUnit>;
  useGalleryCurrency?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryContentArgs = {
  charsMax?: InputMaybe<Scalars['Int']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryEventsArgs = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  cities?: InputMaybe<Array<Scalars['String']['input']>>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<EventFilter>;
  forceReturnIazzuEvents?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<EventSortBy>;
  timeRange?: InputMaybe<EventFilterTimeRange>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryFeaturedImageArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryFeaturedImageUrlArgs = {
  size?: InputMaybe<ImageSizeSize>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryFirstLocationArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryFollowersArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyRegistered?: InputMaybe<Scalars['Boolean']['input']>;
  onlyWithFcmTokens?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<GalleryFollowersSortBy>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryLocationsArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryNewestArtworkArgs = {
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * A Gallery defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallery).
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryPublicWallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

/**  used in Query `queries.galleryAnalytics`  */
export type GalleryAnalytics = {
  __typename?: 'GalleryAnalytics';
  /**  Gallery Artworks (`published`)  */
  artworks?: Maybe<GalleryAnalyticsPublicationsValue>;
  /**  Gallery Events (`published`)  */
  events?: Maybe<GalleryAnalyticsPublicationsValue>;
  /**
   *  Gallery Followers (`total`, `registered`, `push`)
   * Resolvers
   */
  followers?: Maybe<GalleryAnalyticsFollowersValue>;
  /**  Gallery Publications (Artworks + Events) (`published`)  */
  publications?: Maybe<GalleryAnalyticsPublicationsValue>;
  userCanOrCantViewReason: Scalars['String']['output'];
  userCanView: Scalars['Boolean']['output'];
};


/**  used in Query `queries.galleryAnalytics`  */
export type GalleryAnalyticsArtworksArgs = {
  rangeType?: InputMaybe<GalleryAnalyticsArrayRangeType>;
  rangeValue?: InputMaybe<Scalars['Int']['input']>;
};


/**  used in Query `queries.galleryAnalytics`  */
export type GalleryAnalyticsEventsArgs = {
  rangeType?: InputMaybe<GalleryAnalyticsArrayRangeType>;
  rangeValue?: InputMaybe<Scalars['Int']['input']>;
};


/**  used in Query `queries.galleryAnalytics`  */
export type GalleryAnalyticsFollowersArgs = {
  rangeType?: InputMaybe<GalleryAnalyticsArrayRangeType>;
  rangeValue?: InputMaybe<Scalars['Int']['input']>;
};


/**  used in Query `queries.galleryAnalytics`  */
export type GalleryAnalyticsPublicationsArgs = {
  rangeType?: InputMaybe<GalleryAnalyticsArrayRangeType>;
  rangeValue?: InputMaybe<Scalars['Int']['input']>;
};

export enum GalleryAnalyticsArrayRangeType {
  Days = 'Days',
  Months = 'Months',
  Weeks = 'Weeks'
}

export type GalleryAnalyticsFollowers = {
  __typename?: 'GalleryAnalyticsFollowers';
  push: Scalars['Int']['output'];
  registered: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GalleryAnalyticsFollowersSingle = {
  __typename?: 'GalleryAnalyticsFollowersSingle';
  range: GalleryAnalyticsRangeValues;
  values: GalleryAnalyticsFollowers;
};

/**  Used for `queries.galleryAnalytics.followers`  */
export type GalleryAnalyticsFollowersValue = {
  __typename?: 'GalleryAnalyticsFollowersValue';
  /**  Special case: `rangeStart` here is always the Gallery's Publishing Date, `rangeEnd` the day before `rangeRel`/`rangeAbs` starts  */
  before: GalleryAnalyticsFollowersSingle;
  rangeAbs: Array<GalleryAnalyticsFollowersSingle>;
  rangeRel: Array<GalleryAnalyticsFollowersSingle>;
};

export type GalleryAnalyticsPublications = {
  __typename?: 'GalleryAnalyticsPublications';
  published: Scalars['Int']['output'];
};

export type GalleryAnalyticsPublicationsSingle = {
  __typename?: 'GalleryAnalyticsPublicationsSingle';
  range: GalleryAnalyticsRangeValues;
  values: GalleryAnalyticsPublications;
};

/**  Used for `queries.galleryAnalytics.artworks`, `queries.galleryAnalytics.events` & `queries.galleryAnalytics.publications`   */
export type GalleryAnalyticsPublicationsValue = {
  __typename?: 'GalleryAnalyticsPublicationsValue';
  /**  Special case: `rangeStart` here is always the Gallery's Publishing Date, `rangeEnd` the day before `rangeRel`/`rangeAbs` starts  */
  before: GalleryAnalyticsPublicationsSingle;
  rangeAbs: Array<GalleryAnalyticsPublicationsSingle>;
  rangeRel: Array<GalleryAnalyticsPublicationsSingle>;
};

export enum GalleryAnalyticsRangeType {
  AllTime = 'AllTime',
  FromToDayString = 'FromToDayString',
  PastXDays = 'PastXDays',
  PastXMonths = 'PastXMonths',
  PastXWeeks = 'PastXWeeks'
}

export type GalleryAnalyticsRangeValues = {
  __typename?: 'GalleryAnalyticsRangeValues';
  end: GalleryAnalyticsRangeValuesStartEnd;
  label: GalleryAnalyticsRangeValuesLabel;
  start: GalleryAnalyticsRangeValuesStartEnd;
};

/**  Based on `lang` set in query  */
export type GalleryAnalyticsRangeValuesLabel = {
  __typename?: 'GalleryAnalyticsRangeValuesLabel';
  /**  Based on `lang` set in query  */
  full: Scalars['String']['output'];
  /**  Based on `lang` set in query  */
  short: Scalars['String']['output'];
};

export type GalleryAnalyticsRangeValuesStartEnd = {
  __typename?: 'GalleryAnalyticsRangeValuesStartEnd';
  dayString: Scalars['String']['output'];
  ms: Scalars['Timestamp']['output'];
  readable: Scalars['String']['output'];
};

/**
 * Bare basics of a [`Gallery`]({{Types.Gallery}})
 *
 * Example: [**Steff's Showcase Gallery..**](https://iazzu.com/wp/wp-admin/post.php?post=24121&action=edit)
 */
export type GalleryBasic = {
  __typename?: 'GalleryBasic';
  code?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type GalleryBilling = {
  __typename?: 'GalleryBilling';
  contracts: GalleryBillingContracts;
  oneTimeCharges?: Maybe<Array<GalleryOneTimeCharge>>;
};

export type GalleryBillingContractNetGain = {
  __typename?: 'GalleryBillingContractNetGain';
  parts: Array<GalleryBillingContractNetGainPart>;
  year: Scalars['Int']['output'];
};

export type GalleryBillingContractNetGainPart = {
  __typename?: 'GalleryBillingContractNetGainPart';
  costsMonth: Scalars['Float']['output'];
  costsTotal: Scalars['Float']['output'];
  currency: Currency;
  months: Scalars['Int']['output'];
};

export type GalleryBillingContracts = {
  __typename?: 'GalleryBillingContracts';
  cancellationYear?: Maybe<Scalars['Int']['output']>;
  firstRenewal?: Maybe<Scalars['Timestamp']['output']>;
  firstRenewalReadable?: Maybe<Scalars['String']['output']>;
  netGains?: Maybe<Array<GalleryBillingContractNetGain>>;
  nextRenewal?: Maybe<Scalars['Timestamp']['output']>;
  nextRenewalCosts?: Maybe<GalleryBillingContractsNextRenewalCosts>;
  nextRenewalReadable?: Maybe<Scalars['String']['output']>;
  start?: Maybe<Scalars['Timestamp']['output']>;
  startReadable?: Maybe<Scalars['String']['output']>;
};

export type GalleryBillingContractsNextRenewalCosts = {
  __typename?: 'GalleryBillingContractsNextRenewalCosts';
  costsYear: Scalars['Float']['output'];
  currency: Currency;
};

export type GalleryBrandingInfos = {
  __typename?: 'GalleryBrandingInfos';
  colorPrimary?: Maybe<Scalars['String']['output']>;
  colorTextOnPrimary?: Maybe<Scalars['String']['output']>;
  launchScreenLogoType?: Maybe<GalleryBrandingInfosLaunchScreenLogoType>;
  statusBarStyle?: Maybe<Scalars['String']['output']>;
};

export enum GalleryBrandingInfosLaunchScreenLogoType {
  FullscreenImage = 'FULLSCREEN_IMAGE',
  LogoBlack = 'LOGO_BLACK',
  LogoColor = 'LOGO_COLOR',
  LogoWhite = 'LOGO_WHITE'
}

export enum GalleryFilter {
  Followed = 'followed',
  Listed = 'listed'
}

export enum GalleryFollowersSortBy {
  /**  First followed first  */
  Newest = 'newest',
  /**  First followed last  */
  Oldest = 'oldest',
  /**  Most ticks first  */
  Ticks = 'ticks',
  /**  Last visited first */
  Updated = 'updated'
}

export enum GalleryGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Neuter = 'NEUTER',
  Unspecified = 'UNSPECIFIED'
}

export type GalleryManagedWithFollowers = {
  __typename?: 'GalleryManagedWithFollowers';
  code: Scalars['String']['output'];
  followersPush: Scalars['Int']['output'];
  followersRegistered: Scalars['Int']['output'];
  followersTotal: Scalars['Int']['output'];
};

export type GalleryOneTimeCharge = {
  __typename?: 'GalleryOneTimeCharge';
  categories: Array<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  currency: Currency;
  customCategory?: Maybe<Scalars['String']['output']>;
  internalCosts: Scalars['Float']['output'];
  invoiceDate: Scalars['Timestamp']['output'];
  invoiceDateReadable: Scalars['String']['output'];
  invoicedAmount: Scalars['Float']['output'];
  netGain: Scalars['Float']['output'];
};

/** An Gallery Package defined in the [iazzu WP backend](https://iazzu.com/wp/wp-admin/edit.php?post_type=gallerypackage). */
export type GalleryPackage = {
  __typename?: 'GalleryPackage';
  id?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  type: GalleryPackageType;
  wpPostId?: Maybe<Scalars['Int']['output']>;
};

export enum GalleryPackageType {
  Individual = 'INDIVIDUAL',
  Medium = 'MEDIUM',
  Premium = 'PREMIUM',
  Standard = 'STANDARD'
}

export type GalleryPreview = {
  __typename?: 'GalleryPreview';
  artworks: Array<Artwork>;
  code: Scalars['String']['output'];
  featuredImageThumbUrl: Scalars['String']['output'];
  lastArtworkCreated?: Maybe<Scalars['Timestamp']['output']>;
  lastArtworkCreatedReadable?: Maybe<Scalars['String']['output']>;
  newestArtworkCreated?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};


export type GalleryPreviewArtworksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

/**  Set exclusively via [`setGalleryProtectionData`]({{Mutations.setGalleryProtectionData}})   */
export type GalleryProtectionData = {
  __typename?: 'GalleryProtectionData';
  /**  Array of valid email rules   */
  emailRules?: Maybe<Array<Maybe<GalleryProtectionDataEmailRule>>>;
  /**  Whether sharing to Instagram is allowed for this Gallery  */
  enableShareToInstagram?: Maybe<Scalars['Boolean']['output']>;
  /**  Array of valid passwords (in plain text)  */
  passwords?: Maybe<Array<Maybe<GalleryProtectionDataPassword>>>;
  /**  Whether this Gallery is protected or not  */
  protected?: Maybe<Scalars['Boolean']['output']>;
  /**  Whether the requesting user can edit the Protection Data  */
  userCanEdit?: Maybe<Scalars['Boolean']['output']>;
};

export type GalleryProtectionDataEmailRule = {
  __typename?: 'GalleryProtectionDataEmailRule';
  active?: Maybe<Scalars['Boolean']['output']>;
  rule?: Maybe<Scalars['String']['output']>;
};

export type GalleryProtectionDataEmailRuleInput = {
  /**  Whether or not this rule is active or not  */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /**  e.g. `skizzo@backlab.at` or `*@iazzu.com`  */
  rule: Scalars['String']['input'];
};

export type GalleryProtectionDataPassword = {
  __typename?: 'GalleryProtectionDataPassword';
  active?: Maybe<Scalars['Boolean']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type GalleryProtectionDataPasswordInput = {
  /**  Whether this password is currently active or not  */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /**  Optional comment  */
  comment?: InputMaybe<Scalars['String']['input']>;
  /**  The password itself  */
  password: Scalars['String']['input'];
};

export enum GallerySortBy {
  LastArtworkCreated = 'lastArtworkCreated',
  Newest = 'newest'
}

export type GalleryTabBarLabel = {
  __typename?: 'GalleryTabBarLabel';
  tabKey?: Maybe<Scalars['String']['output']>;
  /**  Language-dependent  */
  tabLabel?: Maybe<Scalars['String']['output']>;
};

/**  Data type of updated Gallery used in [ResSGalleryUpdated]({{Types.ResSGalleryUpdated}})  */
export enum GalleryUpdatedType {
  /**  ✅ After **Gallery itself** has been synced via `SyncGalleryHandler`  */
  Anything = 'anything',
  /**  ✅ After Gallery's **Artists** have been synced via `SyncArtistHandler`  */
  Artists = 'artists',
  /**  ✅ After Gallery's **Artworks** have been synced via `SyncArtworkHandler`  */
  Artworks = 'artworks',
  /**  ✅ After Gallery's **Events** have been synced via `SyncEventHandler`  */
  Events = 'events',
  /**  ✅ After Gallery's **Public Walls** have been synced via `SyncWallHandler`  */
  PublicWalls = 'publicWalls',
  /**  ✅ After Gallery's **Surfaces** have been synced via `SyncSurfaceHandler`  */
  Surfaces = 'surfaces',
  /**  ❓ After Gallery's **User Walls** have been synced via `SyncWallHandler` - reduntant, using `UserUpdatedType.walls` instead  */
  UserWalls = 'userWalls'
}

/**  Used in [Location]({{Types.Location}})  */
export type GeoCoordinates = {
  __typename?: 'GeoCoordinates';
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type GooglePlaceById = {
  __typename?: 'GooglePlaceById';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  countryReadableEn?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  formattedAddress: Scalars['String']['output'];
  /**  Place ID without language  */
  id: Scalars['String']['output'];
  lang: Scalars['String']['output'];
  location: LocationLatLng;
  shortFormattedAddress: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  stateShort?: Maybe<Scalars['String']['output']>;
  streetName?: Maybe<Scalars['String']['output']>;
  streetNumber?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type GooglePlacesBySearch = {
  __typename?: 'GooglePlacesBySearch';
  results: Array<GooglePlacesBySearchResult>;
};

export type GooglePlacesBySearchResult = {
  __typename?: 'GooglePlacesBySearchResult';
  /**  Label, e.g. `Carrer del Moianès, 46, Barcelona, Spanien`  */
  label: Scalars['String']['output'];
  /**  Place ID without language, e.g. `ChIJ18qU4oKYpBIRQWeHHry3JDw`  */
  placeId: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  extension: Scalars['String']['output'];
  /**  Used for Additional Images in User Artworks (Firebase Hash)  */
  hash?: Maybe<Scalars['String']['output']>;
  /**  Unique ID  */
  id?: Maybe<Scalars['String']['output']>;
  /**  Used for Additional Images in User Artworks  */
  isDraft: Scalars['Boolean']['output'];
  origin: Scalars['String']['output'];
  originUploadPath?: Maybe<Scalars['String']['output']>;
  size?: Maybe<ImageSize>;
  sizes?: Maybe<Array<ImageSize>>;
  title?: Maybe<Scalars['String']['output']>;
  /**  Image URL in size `u1500`  */
  urlFull?: Maybe<Scalars['String']['output']>;
  /**  Image URL in size `u500`  */
  urlThumb?: Maybe<Scalars['String']['output']>;
  wpPostId?: Maybe<Scalars['Int']['output']>;
};


export type ImageSizeArgs = {
  size: ImageSizeSize;
};


export type ImageSizesArgs = {
  sizes?: InputMaybe<Array<ImageSizeSize>>;
};

export type ImageSingle = {
  __typename?: 'ImageSingle';
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ImageSize = {
  __typename?: 'ImageSize';
  height: Scalars['Int']['output'];
  size: ImageSizeSize;
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

/**  GraphQL Image Size (based on WP Image Sizes), e.g. `c500`, `u1500` or `FBSHARE`  */
export enum ImageSizeSize {
  /**  1200 x 630 px  */
  Fbshare = 'FBSHARE',
  C300 = 'c300',
  C500 = 'c500',
  C1000 = 'c1000',
  C1500 = 'c1500',
  C2000 = 'c2000',
  U300 = 'u300',
  U500 = 'u500',
  U1000 = 'u1000',
  U1500 = 'u1500',
  U2000 = 'u2000'
}

export type ImageWp = {
  __typename?: 'ImageWp';
  id?: Maybe<Scalars['Int']['output']>;
  isDraft?: Maybe<Scalars['Boolean']['output']>;
  sizes?: Maybe<ImageWpSizes>;
  title?: Maybe<Scalars['String']['output']>;
};

/**  Image in various sizes, e.g. `c500`, `u1500` or `FBSHARE`  */
export type ImageWpSizes = {
  __typename?: 'ImageWpSizes';
  /**  1200 x 630 px  */
  FBSHARE?: Maybe<ImageSize>;
  c300?: Maybe<ImageSize>;
  c500?: Maybe<ImageSize>;
  c1000?: Maybe<ImageSize>;
  c1500?: Maybe<ImageSize>;
  c2000?: Maybe<ImageSize>;
  u300?: Maybe<ImageSize>;
  u500?: Maybe<ImageSize>;
  u1000?: Maybe<ImageSize>;
  u1500?: Maybe<ImageSize>;
  u2000?: Maybe<ImageSize>;
};

/** Used in [Artist.links]({{Types.Artist}}), [Gallery.contact.links]({{Types.Gallery}}) and [Contact.links]({{Types.Contact}}) */
export type Link = {
  __typename?: 'Link';
  active?: Maybe<Scalars['Boolean']['output']>;
  /**
   * URL ([`WEBSITE`]({{Types.LinkType.WEBSITE}})),
   * Instagram Handle ([`INSTAGRAM`]({{Types.LinkType.INSTAGRAM}})),
   * etc.
   */
  data?: Maybe<Scalars['String']['output']>;
  /**  e.g. `WEBSITE`  */
  type: LinkType;
};

/**  Type of a [`Link`]({{Types.Link}})  */
export enum LinkType {
  /**  https://behance.com/..  */
  Behance = 'BEHANCE',
  Blogspot = 'BLOGSPOT',
  /**  Facebook Page ID, e.g. `123456789`  */
  FacebookPage = 'FACEBOOK_PAGE',
  FacebookPrivate = 'FACEBOOK_PRIVATE',
  Flickr = 'FLICKR',
  /**  Instagram Handle, e.g. `iazzu`  */
  Instagram = 'INSTAGRAM',
  LinkedinCompany = 'LINKEDIN_COMPANY',
  LinkedinPerson = 'LINKEDIN_PERSON',
  Other = 'OTHER',
  Pinterest = 'PINTEREST',
  Tumblr = 'TUMBLR',
  /**  https://twitter.com/..  */
  Twitter = 'TWITTER',
  /**  Vimeo Video Id, e.g. `23141343`  */
  Vimeo = 'VIMEO',
  /**  e.g. https://tb-photo.ch/  */
  Website = 'WEBSITE',
  /**  Youtube Channel, e.g. `c/iazzu`  */
  Youtube = 'YOUTUBE'
}

/** A Location specified for either a [Gallery]({{Types.Gallery}}), an [Artist]({{Types.Artist}}) or an [Event]({{Types.Event}}) */
export type Location = {
  __typename?: 'Location';
  /**  e.g. `Burg Stettenfels 4, 74199 Untergruppenbach, Allemagne`  */
  address: Scalars['String']['output'];
  /**  e.g. `Burg Stettenfels 4`  */
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  /**  Language-dependent, e.g. `Burg Stettenfels 4, 74199 Untergruppenbach`  */
  addressReadable?: Maybe<Scalars['String']['output']>;
  /**  e.g. `74199`  */
  areaCode?: Maybe<Scalars['String']['output']>;
  /**  e.g. `Untergruppenbach`  */
  city?: Maybe<Scalars['String']['output']>;
  /**  Longitude & Latitude  */
  coords?: Maybe<GeoCoordinates>;
  /**  Language-dependent, e.g. `Allemagne`  */
  country?: Maybe<Scalars['String']['output']>;
  /**  2-digit ISO code  */
  countryCode?: Maybe<Scalars['String']['output']>;
  /**  Only used for galleries  */
  googleMapsShareSuffix?: Maybe<Scalars['String']['output']>;
  /**  Only used for galleries  */
  googleMapsShareUrl?: Maybe<Scalars['String']['output']>;
  /**  Derived from `lng` and `lat`  */
  googleMapsUrl?: Maybe<Scalars['String']['output']>;
  /**  **async** ID returned from Google Places API, via `address` property  */
  googlePlaceId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  /**  Latitude  */
  lat?: Maybe<Scalars['Float']['output']>;
  /**  Longitude  */
  lng?: Maybe<Scalars['Float']['output']>;
  /**  e.g. `Burg Stettenfels`  */
  title?: Maybe<Scalars['String']['output']>;
  /**  Defines whether this location belongs to a Gallery, an Artist or an Event  */
  type: LocationType;
};


/** A Location specified for either a [Gallery]({{Types.Gallery}}), an [Artist]({{Types.Artist}}) or an [Event]({{Types.Event}}) */
export type LocationCountryArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


/** A Location specified for either a [Gallery]({{Types.Gallery}}), an [Artist]({{Types.Artist}}) or an [Event]({{Types.Event}}) */
export type LocationCountryCodeArgs = {
  uppercase?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LocationLatLng = {
  __typename?: 'LocationLatLng';
  /**  Latitude  */
  lat: Scalars['Float']['output'];
  /**  Longitude  */
  lng: Scalars['Float']['output'];
};

export type LocationSearch = {
  __typename?: 'LocationSearch';
  /**  Derived from `location.address`  */
  addressSearch?: Maybe<Scalars['String']['output']>;
  /**  Derived from `addressSearch`  */
  placeId?: Maybe<Scalars['String']['output']>;
};

export enum LocationType {
  Artist = 'ARTIST',
  Event = 'EVENT',
  Gallery = 'GALLERY'
}

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Adds an analytics event to the DB.
   *
   * When testing, make sure to set `forceInTests` to `true` – otherwise, not events are sent.
   */
  addAnalyticsEvent: ResMAddAnalyticsEvent;
  /** Adds a Message to a Conversation / Gallery Chat */
  addUserConversationMessage: ResMAddUserConversationMessage;
  /** Adds a Gallery a [User]({{Types.User}})'s **followed Galleries**. */
  addUserGalleryCode: ResMAddUserGalleryCode;
  /** Adds a Gallery tick to a [User]({{Types.User}})'s Interaction Data. */
  addUserGalleryTick: ResMAddUserGalleryTick;
  /** Cleans up a User's Interactions so the `me` query returns correct values for the `amount..` values. */
  cleanUser: ResMCleanUser;
  /**
   * Delete conversations (from USER data or in general?) that match any of these conditions:
   * - Not created by user, AND for gallery that user doesn't manage (any more)
   * - Created by user, but for gallery that user manages (now) -> delete from all conversations too, like it never happened
   */
  cleanUserConversations: ResMCleanUserConversations;
  cleanUserFollowedGalleries: ResMCleanUserFollowedGalleries;
  cleanUserNotifications: ResMCleanUserNotifications;
  /**
   * Checks all Surfaces created by a User for validity, and deletes invalid Surfaces via
   * [`deleteSurface`]({{Mutations.deleteSurface}}),
   */
  cleanUserSurfaces: ResMCleanUserSurfaces;
  /**
   * Deletes an [Artwork]({{Types.Artwork}}) from Database and Firebase.
   *
   * In case the Artwork is used for any [Walls]({{Types.Wall}}) or User Interactions, these will be deleted as well.
   */
  deleteArtwork: ResMDeleteArtwork;
  /**
   * Deletes a [Surface]({{Types.Surface}}) from Database and Firebase.
   *
   * In case the Artwork is used for any [Walls]({{Types.Wall}}) or User Interactions, these will be deleted as well.
   */
  deleteSurface: ResMDeleteSurface;
  /** Deletes a User from MongoDB and Firebase (DB & Auth). */
  deleteUserAccount: ResMDeleteUserAccount;
  /**
   * Deletes the requesting User's [Wall]({{Types.Wall}}) from Database and Firebase.
   *
   * In case the Wall is used for any User Interactions, these will be deleted as well.
   */
  deleteWall: ResMDeleteWall;
  mergeUsersFollowedGalleries: ResMMergeUsersFollowedGalleries;
  /** Removes a Gallery a [User]({{Types.User}})'s **followed Galleries**. */
  removeUserGalleryCode: ResMRemoveUserGalleryCode;
  reportChatAbuse: ResMReportChatAbuse;
  setAllUserNotificationsSeen: ResMCleanUserNotifications;
  /**
   * Sets a value in the Redis cache.
   *
   */
  setDebugValue: ResMSetDebugValue;
  /**
   * Sets password(s), email rule(s) etc. for a Protected Gallery.
   * Only available for Protection Managers via app (Home Tab).
   */
  setGalleryProtectionData: ResMSetGalleryProtectionData;
  setSurfaceTags: ResMSetSurfaceTags;
  /** Flags an [Artist]({{Types.Artist}}) (identified by its `slug`) as `liked` by the requesting [User]({{Types.User}}). */
  setUserArtistLiked: ResMSetUserArtistLiked;
  /** Flags an [Artist]({{Types.Artist}}) (identified by its `slug`) as `seen` by the requesting [User]({{Types.User}}). */
  setUserArtistSeen: ResMSetUserArtistSeen;
  setUserArtworkData: ResMSetUserArtworkData;
  /** Flags an [Artwork]({{Types.Artwork}}) (identified by its `slug`) as `liked` by the requesting [User]({{Types.User}}). */
  setUserArtworkLiked: ResMSetUserArtworkLiked;
  /** Flags an [Artwork]({{Types.Artwork}}) (identified by its `slug`) as `seen` by the requesting [User]({{Types.User}}). */
  setUserArtworkSeen: ResMSetUserArtworkSeen;
  setUserArtworksExploreStati: ResMSetUserArtworksExploreStati;
  /**
   * Flags an [Blog]({{Types.Blog}}) (identified by its `slug`) as **liked** by the requesting [User]({{Types.User}}).
   * Liked Blogs can be queried via either [`blogs`]({{Queries.blogs}}) or [`blogsLiked`]({{Queries.blogsLiked}}).
   */
  setUserBlogLiked: ResMSetUserBlogLiked;
  /** Flags an [Blog]({{Types.Blog}}) (identified by its `slug`) as `seen` by the requesting [User]({{Types.User}}). */
  setUserBlogSeen: ResMSetUserBlogSeen;
  /**
   * Flags an [Event]({{Types.Event}}) (identified by its `slug`) as **liked** by the requesting [User]({{Types.User}}).
   * Liked Events can be queried via either [`events`]({{Queries.events}}) or [`eventsLiked`]({{Queries.eventsLiked}}).
   */
  setUserEventLiked: ResMSetUserEventLiked;
  /** Flags an [Event]({{Types.Event}}) (identified by its `slug`) as `seen` by the requesting [User]({{Types.User}}). */
  setUserEventSeen: ResMSetUserEventSeen;
  /** Flags a [Gallery]({{Types.Gallery}}) (identified by its `code`) as **favorited** by the requesting [User]({{Types.User}}). */
  setUserGalleryFavorited: ResMSetUserGalleryFavorited;
  /** Changes requesting [User]({{Types.User}})'s gallery passwords to reflect the given args. */
  setUserGalleryPassword: ResMSetUserGalleryPassword;
  /** Sets own user's settings that can be defined in Profile Tab > Settings */
  setUserOwnSettings: ResMSetUserOwnSettings;
  setUserSurfaceData: ResMSetUserSurfaceData;
  /**
   * Generally used for changing a wall's data. Use cases:
   *
   * 1. **Create a new User Wall**
   * 2. **Make a Wall public** (`values.isPublic === true`)
   * 3. **Make a Wall private** (`values.isPublic === false`)
   * 4. **Delete a User Wall** (`values.favorited === false`)
   * 5. **Unpublish a Wall** (admins only), in App either
   *     1. via "Unpublish Wall" (`values._unpublish === true`), or
   *     2. via "Block Surface" [`setUserSurfaceData`]({{Mutations.setUserSurfaceData}}) (`values._block === true`)
   *
   * Other manipulations of Walls:
   *
   * 1. **Favorite/Unfavorite a Wall** (via [`setUserWallLiked`]({{Mutations.setUserWallLiked}}))
   */
  setUserWallData: ResMSetUserWallData;
  /**
   * **Likes or Unlikes** a User Wall so it is shown before all others in the app.
   *
   * For other manipulations of Walls, see [`setUserWallData`]({{Mutations.setUserWallData}}).
   */
  setUserWallLiked: ResMSetUserWallLiked;
};


export type MutationAddAnalyticsEventArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<AnalyticsEventDataEntryInput>>;
  forceInTests?: InputMaybe<Scalars['Boolean']['input']>;
  ip?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  origin: AnalyticsEventOrigin;
  platform?: InputMaybe<ClientPlatform>;
  type: AnalyticsEventType;
  typeKey: Scalars['String']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddUserConversationMessageArgs = {
  conversationId: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  messageText: Scalars['String']['input'];
  originSlugOrId: Scalars['String']['input'];
  originType: Scalars['String']['input'];
};


export type MutationAddUserGalleryCodeArgs = {
  clientId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  setActiveInFirebase?: InputMaybe<Scalars['Boolean']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddUserGalleryTickArgs = {
  clientId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  platform: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCleanUserArgs = {
  types?: InputMaybe<Scalars['String']['input']>;
  uidToClean?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCleanUserConversationsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCleanUserFollowedGalleriesArgs = {
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCleanUserNotificationsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  setAllSeen?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCleanUserSurfacesArgs = {
  uid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteArtworkArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
};


export type MutationDeleteSurfaceArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
};


export type MutationDeleteUserAccountArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  uidToDelete?: InputMaybe<Scalars['String']['input']>;
  viaChatAbuse?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteWallArgs = {
  artworkSlug: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  surfaceId: Scalars['String']['input'];
};


export type MutationMergeUsersFollowedGalleriesArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  uid1: Scalars['String']['input'];
  uid2: Scalars['String']['input'];
};


export type MutationRemoveUserGalleryCodeArgs = {
  clientId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationReportChatAbuseArgs = {
  code: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  reportedUserUid: Scalars['String']['input'];
};


export type MutationSetAllUserNotificationsSeenArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSetDebugValueArgs = {
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetGalleryProtectionDataArgs = {
  code: Scalars['String']['input'];
  inputEmailRules: Array<InputMaybe<GalleryProtectionDataEmailRuleInput>>;
  inputEnableShareToInstagram?: InputMaybe<Scalars['Boolean']['input']>;
  inputPasswords: Array<InputMaybe<GalleryProtectionDataPasswordInput>>;
};


export type MutationSetSurfaceTagsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
};


export type MutationSetUserArtistLikedArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  liked: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserArtistSeenArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserArtworkDataArgs = {
  artworkSlug: Scalars['String']['input'];
  code: Scalars['String']['input'];
  dataJson: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSetUserArtworkLikedArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  liked: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserArtworkSeenArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserArtworksExploreStatiArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  exploredStati: Array<InputMaybe<UserArtworkExploredStatus>>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserBlogLikedArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  liked: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserBlogSeenArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserEventLikedArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  liked: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserEventSeenArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserGalleryFavoritedArgs = {
  code: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  favorited: Scalars['Boolean']['input'];
  force?: InputMaybe<Scalars['Boolean']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserGalleryPasswordArgs = {
  code: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetUserOwnSettingsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  input: UserOwnSettingsInput;
};


export type MutationSetUserSurfaceDataArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  surfaceId: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  valuesHash?: InputMaybe<Scalars['String']['input']>;
  valuesJson: Scalars['String']['input'];
};


export type MutationSetUserWallDataArgs = {
  artworkSlug: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  surfaceId: Scalars['String']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
  valuesHash?: InputMaybe<Scalars['String']['input']>;
  valuesJson: Scalars['String']['input'];
  variantIndex?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSetUserWallLikedArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  liked: Scalars['Boolean']['input'];
  uid?: InputMaybe<Scalars['String']['input']>;
};

/** Single Entry of [`Event.openingHours`]({{Types.Event}}), defines either a date range or a weekday range with optional time ranges. */
export type OpeningHoursEntry = {
  __typename?: 'OpeningHoursEntry';
  /**  **date range**: start date (e.g. `2024-12-24`)  */
  dateFrom?: Maybe<Scalars['String']['output']>;
  /**  **date range**: end date (e.g. `2024-12-31`)  */
  dateTo?: Maybe<Scalars['String']['output']>;
  /**  Optional **time range** for the entry, e.g. `8:00-12:00`  */
  timeRange?: Maybe<Scalars['String']['output']>;
  /**  **weekday range**: start day (`mo` | `tu` | `we` | ..)  */
  weekdayFrom?: Maybe<Scalars['String']['output']>;
  /**  **weekday range**: end day (`th` | `fr` | `sa` | ..)  */
  weekdayTo?: Maybe<Scalars['String']['output']>;
};

export type ProfileInfos = {
  __typename?: 'ProfileInfos';
  /**  Gallery title for type `gallery`, User Display Name for type `user`, fallback: `anonymous`  */
  displayName: Scalars['String']['output'];
  /**  Email of either Gallery Contact, or User  */
  email?: Maybe<Scalars['String']['output']>;
  idOrSlug: Scalars['String']['output'];
  /**  Gallery Featured Image for type `gallery`, User Photo URL for type `user`, fallback: [`https://iazzu.com/img/icon_not_logged.png`](https://iazzu.com/img/icon_not_logged.png)   */
  imageUrl: Scalars['String']['output'];
  type: Scalars['String']['output'];
  typeExtras?: Maybe<ProfileInfosTypeExtras>;
};

export type ProfileInfosRequestEntry = {
  /**  Gallery Slug or Firebase User ID  */
  idOrSlug: Scalars['String']['input'];
  /**  `gallery` | `user`  */
  type: Scalars['String']['input'];
};

export type ProfileInfosTypeExtras = {
  __typename?: 'ProfileInfosTypeExtras';
  galleryCode?: Maybe<Scalars['String']['output']>;
};

export type ProtectedContentUserAccessData = {
  __typename?: 'ProtectedContentUserAccessData';
  canAccess?: Maybe<Scalars['Boolean']['output']>;
  /**  Only `true` if User manages related Gallery  */
  canViewDrafts?: Maybe<Scalars['Boolean']['output']>;
  /**
   * **`canAccess === false`**
   *
   *   `no-protection-settings`: <br/>Gallery has never set protection settings via [`setGalleryProtectionData`]({{Mutations.setGalleryProtectionData}})
   *
   *   `missing-uid`, `missing-email`, `gallery-not-found`, `no-user-given`, `email-nor-password-matching`
   *
   * **`canAccess === true`**
   *
   *   `user-is-admin`, `gallery-not-protected`, `user-manages-gallery`, `user-manages-gallery-protection`, `email-matches-pattern`, `password-matching`
   */
  reason?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns Analytics Events based on specific filter */
  analyticsEvents: Array<AnalyticsEvent>;
  /** Returns a single Artist identified by its `slug`. */
  artistBySlug?: Maybe<Artist>;
  /**
   * Returns a list of Artists defined by the query arguments.
   *
   * - **Artists Tab**:
   *     - `galleryCode`: `CurrentlyActiveAppGallery`
   *     - `sortBy`: `newest` | `firstLastName`
   * - **Liked Artists**:
   *     - ~~`galleryCode`: undefined~~
   *     - `sortBy`: `lastLiked`
   *     - `skip`: `0`, `25`, `50`, ..
   *     - `limit`: `25`
   */
  artists?: Maybe<Array<Artist>>;
  /** Returns a specific Artwork defined by its slug. */
  artworkBySlug?: Maybe<Artwork>;
  /** Returns all available Artwork Categories. */
  artworkCategories?: Maybe<Array<ArtworkCategory>>;
  /** Returns all available Artwork Materials. */
  artworkMaterials?: Maybe<Array<ArtworkMaterial>>;
  /** Returns Artwork Materials that have the same labels in at least two languages */
  artworkMaterialsToFix: ArtworkMaterialsOrTechniquesToFix;
  /** Returns all available Artwork Techniques. */
  artworkTechniques?: Maybe<Array<ArtworkTechnique>>;
  /** Returns Artwork Techniques that have the same labels in at least two languages */
  artworkTechniquesToFix: ArtworkMaterialsOrTechniquesToFix;
  /** Returns a list of Artworks defined by the query arguments. */
  artworks?: Maybe<Array<Artwork>>;
  artworksByMaterial?: Maybe<Array<Artwork>>;
  artworksByTechnique?: Maybe<Array<Artwork>>;
  /** Returns Artworks for the iazzu Gallery. */
  artworksDefaultGallery: ArtworksDefaultGallery;
  authTokenInfo: AuthTokenInfo;
  /** Used for Clients Module (availability status selection) */
  availabilityStati: AvailabilityStati;
  /**
   * Returns a single Blog by its `slug`.
   * **IMPORTANT**: The `langBySlug` arg needs to be `true` in order to find Blogs in other languages than English.
   */
  blogBySlug?: Maybe<Blog>;
  /**
   * Returns all publically available Blog Entries
   *
   * - **Blog itself** is available if the `status` of the English post is `PUBLIC`.
   *
   * - **Translation** is available if the `status` of the Translation post is `PUBLIC`, fallback: English version
   */
  blogs?: Maybe<Array<Blog>>;
  /**
   * Returns all Blogs liked by the requesting [`User`]({{Types.User}})
   * via mutation [`setUserBlogLiked`]({{Mutations.setUserBlogLiked}})
   */
  blogsLiked: Array<Blog>;
  /** Creates and returns Branch Link infos for Galleries, Artists, Artworks, Walls and Events. */
  branchLink?: Maybe<BranchLink>;
  /** Returns **existing** Branch Link infos for Galleries, Artists, Artworks, Walls and Events. */
  branchUrlInfos: BranchUrlInfos;
  /** Used for Clients Module (country selection) */
  countries: Countries;
  /** Used for Clients Module (price entry) */
  currencyConverted: CurrencyConverted;
  dateStartEndParts: DateStartEndParts;
  /**
   * Fetches a value from the Redis Cache.
   *
   */
  debugValue: DebugValue;
  /** Returns a single Event by its `slug` */
  eventBySlug?: Maybe<Event>;
  /** Used for Clients Module (Event Category selection) */
  eventCategories: EventCategories;
  /** Returns all Events with that match given `galleryCode` and `filter`. */
  events?: Maybe<Array<Event>>;
  /** Returns all Events with that match given `slugs` */
  eventsBySlugs?: Maybe<Array<Event>>;
  eventsFilterValues: EventsFilterValues;
  /**
   * Returns all Events liked by the requesting [`User`]({{Types.User}})
   * via mutation [`setUserEventLiked`]({{Mutations.setUserEventLiked}})
   */
  eventsLiked: Array<Event>;
  galleries?: Maybe<Array<Gallery>>;
  /** Used for Website (`NBGraphQl.php`) */
  galleriesBasic: Array<Gallery>;
  /** Used for Website (`NBGraphQl.php`) */
  galleriesManagedByEmailBasics?: Maybe<Array<GalleryBasic>>;
  /**  Used in App (Profile Tab for Managers)  */
  galleriesManagedFollowers?: Maybe<Array<GalleryManagedWithFollowers>>;
  /** Used for Website (`NBGraphQl.php`) */
  galleriesOvr: Array<Gallery>;
  galleryAnalytics?: Maybe<GalleryAnalytics>;
  galleryByCode?: Maybe<Gallery>;
  galleryBySlug?: Maybe<Gallery>;
  galleryProtectionData?: Maybe<GalleryProtectionData>;
  /** Used for Clients Module (Address Search in Map Component) */
  googlePlaceById?: Maybe<GooglePlaceById>;
  /** Used for Clients Module (Address Search in Map Component) */
  googlePlacesBySearch: GooglePlacesBySearch;
  /** Returns infos about requesting User (identified by request's authorization headers). */
  me?: Maybe<User>;
  profileInfos?: Maybe<ProfileInfos>;
  profileInfosMulti?: Maybe<Array<ProfileInfos>>;
  /**  Used in `NBGraphQl.php`  */
  stats?: Maybe<Stats>;
  /**  Used in iazzu-walls  */
  status?: Maybe<Status>;
  streamItems: StreamItems;
  /** Returns filter values shown in Home Screen / Feed */
  streamItemsFilterValues: StreamItemsFilterValues;
  /** Returns a list of Surfaces defined by the query arguments. */
  surfaces?: Maybe<Array<Surface>>;
  /** Returns a list of Public Surfaces and available Galleries (basics only) */
  surfacesAdmins: SurfacesAdmins;
  /** Returns Surfaces that are not used for any walls */
  surfacesNotOnWalls?: Maybe<Array<Surface>>;
  wallInfos?: Maybe<WallInfos>;
  walls?: Maybe<Array<Wall>>;
  /**  Used in App Screen `SArtworkDetails`  */
  wallsByArtworkSlug?: Maybe<Array<Wall>>;
  wallsByIdFirebase?: Maybe<Array<Wall>>;
  wallsByIdsGeneric?: Maybe<Array<Wall>>;
  /**
   * Returns all Walls liked by the requesting [`User`]({{Types.User}})
   * via mutation [`setUserWallLiked`]({{Mutations.setUserWallLiked}})
   */
  wallsLiked: Array<Wall>;
};


export type QueryAnalyticsEventsArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  filter: AnalyticsEventsFilter;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<AnalyticsEventsSortBy>;
};


export type QueryArtistBySlugArgs = {
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryArtistsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ArtistFilter>;
  galleryCode?: InputMaybe<Scalars['String']['input']>;
  galleryQueryMode?: InputMaybe<ArtistGalleryQueryMode>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ArtistSortBy>;
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryArtworkBySlugArgs = {
  currency?: InputMaybe<Currency>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  skipSync?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
  unit?: InputMaybe<DimensionsUnit>;
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
  useGalleryCurrency?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryArtworkCategoriesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArtworkMaterialsArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArtworkTechniquesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryArtworksArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Currency>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  dominantColors?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<ArtworkFilter>;
  galleryCode?: InputMaybe<Scalars['String']['input']>;
  galleryQueryMode?: InputMaybe<ArtworkGalleryQueryMode>;
  heightMaxMm?: InputMaybe<Scalars['Float']['input']>;
  heightMinMm?: InputMaybe<Scalars['Float']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  materialsSlugs?: InputMaybe<Array<Scalars['String']['input']>>;
  onlyAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  priceMaxEur?: InputMaybe<Scalars['Float']['input']>;
  priceMinEur?: InputMaybe<Scalars['Float']['input']>;
  profilingMode?: InputMaybe<Scalars['Boolean']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ArtworkSortBy>;
  surfaceId?: InputMaybe<Scalars['String']['input']>;
  techniquesSlugs?: InputMaybe<Array<Scalars['String']['input']>>;
  unit?: InputMaybe<DimensionsUnit>;
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
  useGalleryCurrency?: InputMaybe<Scalars['Boolean']['input']>;
  widthMaxMm?: InputMaybe<Scalars['Float']['input']>;
  widthMinMm?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryArtworksByMaterialArgs = {
  currency?: InputMaybe<Currency>;
  lang?: InputMaybe<Scalars['String']['input']>;
  materialSlugEn: Scalars['String']['input'];
  unit?: InputMaybe<DimensionsUnit>;
};


export type QueryArtworksByTechniqueArgs = {
  currency?: InputMaybe<Currency>;
  lang?: InputMaybe<Scalars['String']['input']>;
  techniqueSlugEn: Scalars['String']['input'];
  unit?: InputMaybe<DimensionsUnit>;
};


export type QueryArtworksDefaultGalleryArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limitGalleryPreviewArtworks: Scalars['Int']['input'];
  limitLatestAdditions: Scalars['Int']['input'];
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAuthTokenInfoArgs = {
  uid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAvailabilityStatiArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBlogBySlugArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  langBySlug?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
};


export type QueryBlogsArgs = {
  filter?: InputMaybe<BlogFilter>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<BlogSortBy>;
};


export type QueryBlogsLikedArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<BlogSortBy>;
};


export type QueryBranchLinkArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  forceUpdate?: InputMaybe<Scalars['Boolean']['input']>;
  identifier: Scalars['String']['input'];
  lang?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  useNewDomain?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBranchUrlInfosArgs = {
  fresh?: InputMaybe<Scalars['Boolean']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  urlPostfix?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCountriesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCurrencyConvertedArgs = {
  inputCurrency: Currency;
  inputValues: Array<Scalars['String']['input']>;
  outputCurrency: Currency;
  priceIsExact: Scalars['Boolean']['input'];
};


export type QueryDateStartEndPartsArgs = {
  endMs?: InputMaybe<Scalars['Timestamp']['input']>;
  lang: Scalars['String']['input'];
  startMs: Scalars['Timestamp']['input'];
  type?: InputMaybe<EventDateStartEndPartsType>;
};


export type QueryDebugValueArgs = {
  key: Scalars['String']['input'];
};


export type QueryEventBySlugArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};


export type QueryEventCategoriesArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventsArgs = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  cities?: InputMaybe<Array<Scalars['String']['input']>>;
  coords?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<EventFilter>;
  galleryCode?: InputMaybe<Scalars['String']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxDistance?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<EventSortBy>;
  timeRange?: InputMaybe<EventFilterTimeRange>;
};


export type QueryEventsBySlugsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  slugs: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryEventsFilterValuesArgs = {
  galleryCode: Scalars['String']['input'];
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventsLikedArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  queryMode?: InputMaybe<EventQueryMode>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<EventSortBy>;
};


export type QueryGalleriesArgs = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  codes?: InputMaybe<Array<Scalars['String']['input']>>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<GalleryFilter>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GallerySortBy>;
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGalleriesManagedByEmailBasicsArgs = {
  email: Scalars['String']['input'];
};


export type QueryGalleriesOvrArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGalleryAnalyticsArgs = {
  code: Scalars['String']['input'];
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGalleryByCodeArgs = {
  code: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  forceSync?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  skipSync?: InputMaybe<Scalars['Boolean']['input']>;
  useBoost?: InputMaybe<Scalars['Boolean']['input']>;
  useCache?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGalleryBySlugArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};


export type QueryGalleryProtectionDataArgs = {
  code: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGooglePlaceByIdArgs = {
  lang: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
};


export type QueryGooglePlacesBySearchArgs = {
  lang: Scalars['String']['input'];
  search: Scalars['String']['input'];
};


export type QueryMeArgs = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  syncBefore?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProfileInfosArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  idOrSlug: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryProfileInfosMultiArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  entries: Array<InputMaybe<ProfileInfosRequestEntry>>;
};


export type QueryStreamItemsArgs = {
  before?: InputMaybe<Scalars['Timestamp']['input']>;
  code: Scalars['String']['input'];
  currency?: InputMaybe<Currency>;
  forceReturnIazzuEvents?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  types?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<DimensionsUnit>;
};


export type QueryStreamItemsFilterValuesArgs = {
  code: Scalars['String']['input'];
};


export type QuerySurfacesArgs = {
  artworkHeight?: InputMaybe<Scalars['Int']['input']>;
  artworkWidth?: InputMaybe<Scalars['Int']['input']>;
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  galleryCode?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  onlyWithBoundaries?: InputMaybe<Scalars['Boolean']['input']>;
  queryMode?: InputMaybe<SurfaceQueryMode>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SurfaceSortBy>;
  uid?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySurfacesAdminsArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySurfacesNotOnWallsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  excludeTeam?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SurfaceSortBy>;
};


export type QueryWallInfosArgs = {
  artworkSlug: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  surfaceId: Scalars['String']['input'];
};


export type QueryWallsArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<WallFilter>;
  galleryCode?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  queryMode?: InputMaybe<WallQueryMode>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<WallSortBy>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uidsExcluded?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryWallsByArtworkSlugArgs = {
  artworkSlug: Scalars['String']['input'];
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  queryMode: WallQueryMode;
  uid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWallsByIdFirebaseArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  idFirebase: Scalars['String']['input'];
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWallsByIdsGenericArgs = {
  debug?: InputMaybe<Scalars['Boolean']['input']>;
  idsGeneric: Array<InputMaybe<Scalars['String']['input']>>;
  lang?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWallsLikedArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**  Response returned from mutation [`addAnalyticsEvent`]({{Mutations.addAnalyticsEvent}})  */
export type ResMAddAnalyticsEvent = {
  __typename?: 'ResMAddAnalyticsEvent';
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`addUserConversationMessage`]({{Mutations.addUserConversationMessage}})  */
export type ResMAddUserConversationMessage = {
  __typename?: 'ResMAddUserConversationMessage';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`addUserGalleryCode`]({{Mutations.addUserGalleryCode}})  */
export type ResMAddUserGalleryCode = {
  __typename?: 'ResMAddUserGalleryCode';
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`addUserGalleryTick`]({{Mutations.addUserGalleryTick}})  */
export type ResMAddUserGalleryTick = {
  __typename?: 'ResMAddUserGalleryTick';
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  ticksNew?: Maybe<Scalars['Int']['output']>;
};

/**  Response returned from mutation [`cleanUser`]({{Mutations.cleanUser}})  */
export type ResMCleanUser = {
  __typename?: 'ResMCleanUser';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`cleanUserConversations`]({{Mutations.cleanUserConversations}})  */
export type ResMCleanUserConversations = {
  __typename?: 'ResMCleanUserConversations';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`cleanUserFollowedGalleries`]({{Mutations.cleanUserFollowedGalleries}})  */
export type ResMCleanUserFollowedGalleries = {
  __typename?: 'ResMCleanUserFollowedGalleries';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutations [`cleanUserNotifications`]({{Mutations.cleanUserNotifications}}) and [`setAllUserNotificationsSeen`]({{Mutations.setAllUserNotificationsSeen}})  */
export type ResMCleanUserNotifications = {
  __typename?: 'ResMCleanUserNotifications';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`cleanUserSurfaces`]({{Mutations.cleanUserSurfaces}})  */
export type ResMCleanUserSurfaces = {
  __typename?: 'ResMCleanUserSurfaces';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`deleteArtwork`]({{Mutations.deleteArtwork}})  */
export type ResMDeleteArtwork = {
  __typename?: 'ResMDeleteArtwork';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`deleteSurface`]({{Mutations.deleteSurface}})  */
export type ResMDeleteSurface = {
  __typename?: 'ResMDeleteSurface';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`deleteUserAccount`]({{Mutations.deleteUserAccount}})  */
export type ResMDeleteUserAccount = {
  __typename?: 'ResMDeleteUserAccount';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`deleteWall`]({{Mutations.deleteWall}})  */
export type ResMDeleteWall = {
  __typename?: 'ResMDeleteWall';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`mergeUsersFollowedGalleries`]({{Mutations.mergeUsersFollowedGalleries}})  */
export type ResMMergeUsersFollowedGalleries = {
  __typename?: 'ResMMergeUsersFollowedGalleries';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`removeUserGalleryCode`]({{Mutations.removeUserGalleryCode}})  */
export type ResMRemoveUserGalleryCode = {
  __typename?: 'ResMRemoveUserGalleryCode';
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`reportChatAbuse`]({{Mutations.reportChatAbuse}})  */
export type ResMReportChatAbuse = {
  __typename?: 'ResMReportChatAbuse';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setDebugValue`]({{Mutations.setDebugValue}})  */
export type ResMSetDebugValue = {
  __typename?: 'ResMSetDebugValue';
  success?: Maybe<Scalars['Boolean']['output']>;
  /** key: String! */
  value?: Maybe<Scalars['String']['output']>;
};

/**  Response returned from mutation [`setGalleryProtectionData`]({{Mutations.setGalleryProtectionData}})  */
export type ResMSetGalleryProtectionData = {
  __typename?: 'ResMSetGalleryProtectionData';
  actions: Array<Scalars['String']['output']>;
  /**  `1` when protection data was updated correctly */
  amountActions?: Maybe<Scalars['Int']['output']>;
  /**  missing-user-email | gallery-not-found | missing-permissions   */
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setSurfaceTags`]({{Mutations.setSurfaceTags}})  */
export type ResMSetSurfaceTags = {
  __typename?: 'ResMSetSurfaceTags';
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserArtistLiked`]({{Mutations.setUserArtistLiked}})  */
export type ResMSetUserArtistLiked = {
  __typename?: 'ResMSetUserArtistLiked';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserArtistSeen`]({{Mutations.setUserArtistSeen}})  */
export type ResMSetUserArtistSeen = {
  __typename?: 'ResMSetUserArtistSeen';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserArtworkData`]({{Mutations.setUserArtworkData}})  */
export type ResMSetUserArtworkData = {
  __typename?: 'ResMSetUserArtworkData';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserArtworkLiked`]({{Mutations.setUserArtworkLiked}})  */
export type ResMSetUserArtworkLiked = {
  __typename?: 'ResMSetUserArtworkLiked';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserArtworkSeen`]({{Mutations.setUserArtworkSeen}})  */
export type ResMSetUserArtworkSeen = {
  __typename?: 'ResMSetUserArtworkSeen';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserArtworkExploredStati`]({{Mutations.setUserArtworkExploredStati}})  */
export type ResMSetUserArtworksExploreStati = {
  __typename?: 'ResMSetUserArtworksExploreStati';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserBlogLiked`]({{Mutations.setUserBlogLiked}})  */
export type ResMSetUserBlogLiked = {
  __typename?: 'ResMSetUserBlogLiked';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserBlogSeen`]({{Mutations.setUserBlogSeen}})  */
export type ResMSetUserBlogSeen = {
  __typename?: 'ResMSetUserBlogSeen';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  /**  missing-uid | blog-not-found  */
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserEventLiked`]({{Mutations.setUserEventLiked}})  */
export type ResMSetUserEventLiked = {
  __typename?: 'ResMSetUserEventLiked';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserEventSeen`]({{Mutations.setUserEventSeen}})  */
export type ResMSetUserEventSeen = {
  __typename?: 'ResMSetUserEventSeen';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  /**  missing-uid | event-not-found  */
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserGalleryFavorited`]({{Mutations.setUserGalleryFavorited}})  */
export type ResMSetUserGalleryFavorited = {
  __typename?: 'ResMSetUserGalleryFavorited';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserGalleryPassword`]({{Mutations.setUserGalleryPassword}})  */
export type ResMSetUserGalleryPassword = {
  __typename?: 'ResMSetUserGalleryPassword';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserOwnSettings`]({{Mutations.setUserOwnSettings}})  */
export type ResMSetUserOwnSettings = {
  __typename?: 'ResMSetUserOwnSettings';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserSurfaceData`]({{Mutations.setUserSurfaceData}})  */
export type ResMSetUserSurfaceData = {
  __typename?: 'ResMSetUserSurfaceData';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserWallData`]({{Mutations.setUserWallData}})  */
export type ResMSetUserWallData = {
  __typename?: 'ResMSetUserWallData';
  actions?: Maybe<Array<Scalars['String']['output']>>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**  Response returned from mutation [`setUserWallLiked`]({{Mutations.setUserWallLiked}})  */
export type ResMSetUserWallLiked = {
  __typename?: 'ResMSetUserWallLiked';
  actions: Array<Scalars['String']['output']>;
  amountActions?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**
 *  ✅ Result of the [`artistUpdated`]({{Subscriptions.artistUpdated}}) subscription
 * ##############################################################
 */
export type ResSArtistUpdated = {
  __typename?: 'ResSArtistUpdated';
  slug: Scalars['String']['output'];
};

/**
 *  ✅ Result of the [`artworkUpdated`]({{Subscriptions.artworkUpdated}}) subscription
 * ##############################################################
 */
export type ResSArtworkUpdated = {
  __typename?: 'ResSArtworkUpdated';
  /**  Artwork Slug  */
  slug: Scalars['String']['output'];
};

/**
 *  Result of the [`galleryUpdated`]({{Subscriptions.galleryUpdated}}) subscription
 * ##############################################################
 */
export type ResSGalleryUpdated = {
  __typename?: 'ResSGalleryUpdated';
  code: Scalars['String']['output'];
  /**  Actual slugs or IDs  */
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**  `slug` (artists, artworks, events) or `ID` (walls)  */
  keysType?: Maybe<Scalars['String']['output']>;
  /**  Data type of updated Gallery (`anything`, `artists`, `artworks`, `events`, `surfaces`, `userWalls`, `publicWalls`)  */
  type: GalleryUpdatedType;
};

/**
 *  ✅ Result of the [`surfaceUpdated`]({{Subscriptions.surfaceUpdated}}) subscription
 * ##############################################################
 */
export type ResSSurfaceUpdated = {
  __typename?: 'ResSSurfaceUpdated';
  /**  Surface Firebase ID  */
  surfaceId: Scalars['String']['output'];
};

/**
 *  Result of the [userUpdated]({{Subscriptions.userUpdated}}) subscription
 * ##############################################################
 */
export type ResSUserUpdated = {
  __typename?: 'ResSUserUpdated';
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  keysType?: Maybe<Scalars['String']['output']>;
  /**
   *  Data type of updated User (`settings`, `walls`, `likedArtworks`, `likedArtists`, `likedEvents`)
   * type: String # e.g.  "walls" # TODO: Find out if enums work from app too
   */
  type: UserUpdatedType;
  /**  Firebase UID of updated user  */
  uid: Scalars['String']['output'];
};

/**
 *  Result of the [`wallUpdated`]({{Subscriptions.wallUpdated}}) subscription
 * ##############################################################
 */
export type ResSWallUpdated = {
  __typename?: 'ResSWallUpdated';
  /**  Artwork Slug the subscribed/updated Wall  */
  artworkSlug: Scalars['String']['output'];
  /**  Firebase ID of the subscribed/updated Wall  */
  idFirebase: Scalars['String']['output'];
  /**  Generic ID of the subscribed/updated Wall  */
  idGeneric: Scalars['String']['output'];
  /**  Surface ID the subscribed/updated Wall  */
  surfaceId: Scalars['String']['output'];
};

export type SlugsInLangs = {
  __typename?: 'SlugsInLangs';
  de: Scalars['String']['output'];
  en: Scalars['String']['output'];
  es: Scalars['String']['output'];
  fr: Scalars['String']['output'];
};

export type SpectaQlOption = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Stats = {
  __typename?: 'Stats';
  artists: ArtistsStats;
  artworkCategories?: Maybe<ArtworkCategoriesStats>;
  artworkMaterials?: Maybe<ArtworkMaterialsStats>;
  artworkTechniques?: Maybe<ArtworkTechniquesStats>;
  artworks: ArtworksStats;
  events: EventsStats;
  galleries: GalleriesStats;
  surfaces: SurfacesStats;
  sync?: Maybe<SyncStatus>;
  userInteractions?: Maybe<UserInteractionsStats>;
  users: UsersStats;
  walls: WallsStats;
};

export type Status = {
  __typename?: 'Status';
  version: Scalars['String']['output'];
};

export type StreamItem = {
  __typename?: 'StreamItem';
  _meta: StreamItemMeta;
  /**  Artwork (in case `type` is `artwork`, `artist` or `wall`)  */
  artist?: Maybe<Artist>;
  /**
   *  Artwork (in case `type` is `artwork` or `wall`)
   * ####################################
   */
  artwork?: Maybe<Artwork>;
  /**  Blog (in case `type` is `blog`)  */
  blog?: Maybe<Blog>;
  codes?: Maybe<Array<Scalars['String']['output']>>;
  created: Scalars['Timestamp']['output'];
  createdR: Scalars['String']['output'];
  /**  Artwork (in case `type` is `event`)  */
  event?: Maybe<Event>;
  gallery?: Maybe<StreamItemGallery>;
  /**  Gallery (in any case)  */
  galleryFull?: Maybe<Gallery>;
  /**
   * **Slug** when `type` is 'artist', 'artwork', 'blog' or 'event',
   *
   * **Firebase ID** when type is 'wall'
   */
  id: Scalars['String']['output'];
  image?: Maybe<ImageSingle>;
  title?: Maybe<Scalars['String']['output']>;
  type: StreamItemType;
  typeData: StreamItemTypeData;
  userLiked?: Maybe<Scalars['Boolean']['output']>;
  /**  Artwork (in case `type` is `wall`)  */
  wall?: Maybe<Wall>;
};

export type StreamItemGallery = {
  __typename?: 'StreamItemGallery';
  code?: Maybe<Scalars['String']['output']>;
  thumb?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type StreamItemMeta = {
  __typename?: 'StreamItemMeta';
  artistsIds?: Maybe<Array<Scalars['String']['output']>>;
  artworkSlug?: Maybe<Scalars['String']['output']>;
  artworkVariantIndex?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Currency>;
  idGeneric?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<DimensionsUnit>;
};

export enum StreamItemType {
  Artist = 'artist',
  Artwork = 'artwork',
  Blog = 'blog',
  Event = 'event',
  Wall = 'wall'
}

export type StreamItemTypeData = {
  __typename?: 'StreamItemTypeData';
  listImageUrl: Scalars['String']['output'];
};

export type StreamItems = {
  __typename?: 'StreamItems';
  items?: Maybe<Array<StreamItem>>;
  pagination?: Maybe<StreamItemsPagination>;
};

export type StreamItemsFilterValues = {
  __typename?: 'StreamItemsFilterValues';
  hasArtists: Scalars['Boolean']['output'];
  hasArtworks: Scalars['Boolean']['output'];
  hasBlogs: Scalars['Boolean']['output'];
  hasEvents: Scalars['Boolean']['output'];
  hasWalls: Scalars['Boolean']['output'];
};

export type StreamItemsPagination = {
  __typename?: 'StreamItemsPagination';
  hasMore: Scalars['Boolean']['output'];
  lastReturnedCreated?: Maybe<Scalars['Timestamp']['output']>;
  lastReturnedCreatedR?: Maybe<Scalars['String']['output']>;
  returned: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type StringInLangs = {
  __typename?: 'StringInLangs';
  de?: Maybe<Scalars['String']['output']>;
  en?: Maybe<Scalars['String']['output']>;
  es?: Maybe<Scalars['String']['output']>;
  fr?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /**
   * Triggered after:
   *
   *   1. `GET /sync/artist/slug/:slug/:mode?`
   *   2. → `SyncArtistHandler.handle()`
   *   3. → `PubSubModule.handleCompleted()`
   * ############################################################
   */
  artistUpdated: ResSArtistUpdated;
  /**
   * Triggered after:
   *
   *   1. `GET /sync/artwork/slug/:slug/:mode?`
   *   2. → `SyncArtworkHandler.handle()`
   *   3. → `PubSubModule.handleCompleted()`
   * ############################################################
   */
  artworkUpdated: ResSArtworkUpdated;
  /**
   * Triggered after:
   *
   *   1. `GET /sync/gallery/code/:code/:mode?`
   *   2. → `SyncGalleryHandler.handle()`
   *   3. → `PubSubModule.handleCompleted()`
   * ############################################################
   */
  galleryUpdated: ResSGalleryUpdated;
  /** ############################################################ */
  newEvent?: Maybe<Event>;
  /** ############################################################ */
  surfaceUpdated: ResSSurfaceUpdated;
  /**
   * Triggered after:
   *
   *   1. `GET /sync/user/uid/:uid/:mode?`
   *   2. → `SyncUserHandler.handle()`
   *   3. → `PubSubModule.handleCompleted()`
   *
   * Only works if requesting User's UID (subscriber) matches argument's UID (resource).
   * ############################################################
   */
  userUpdated: ResSUserUpdated;
  /**
   * TODO: Use in App!
   * ############################################################
   */
  wallUpdated: ResSWallUpdated;
};


export type SubscriptionArtistUpdatedArgs = {
  slug: Scalars['String']['input'];
};


export type SubscriptionArtworkUpdatedArgs = {
  slug: Scalars['String']['input'];
};


export type SubscriptionGalleryUpdatedArgs = {
  code: Scalars['String']['input'];
};


export type SubscriptionSurfaceUpdatedArgs = {
  surfaceId: Scalars['String']['input'];
};


export type SubscriptionUserUpdatedArgs = {
  uid: Scalars['String']['input'];
};


export type SubscriptionWallUpdatedArgs = {
  idGeneric: Scalars['String']['input'];
};

export type Surface = {
  __typename?: 'Surface';
  amountsWalls?: Maybe<SurfaceAmountsWalls>;
  blocked: Scalars['Boolean']['output'];
  boundaries: SurfaceBoundaries;
  boundariesDims?: Maybe<SurfaceBoundariesDims>;
  boundariesDimsCm?: Maybe<SurfaceBoundariesDimsCm>;
  center?: Maybe<SurfaceCenter>;
  cornersUser?: Maybe<SurfaceCornersUser>;
  created: Scalars['Timestamp']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  createdByMe?: Maybe<Scalars['Boolean']['output']>;
  createdReadable?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<SurfaceDimensions>;
  dimensionsCm?: Maybe<SurfaceDimensionsCm>;
  firebaseEditUrl?: Maybe<Scalars['String']['output']>;
  hasBoundaries?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  imageFullUrl?: Maybe<Scalars['String']['output']>;
  imageThumbUrl?: Maybe<Scalars['String']['output']>;
  insets?: Maybe<SurfaceInsets>;
  original?: Maybe<SurfaceOriginal>;
  propsSurface?: Maybe<SurfacePropsSurface>;
  public: Scalars['Boolean']['output'];
  publicGalleries?: Maybe<Array<Maybe<Gallery>>>;
  publicGalleriesIds: Array<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  valuesHash?: Maybe<Scalars['String']['output']>;
  walls?: Maybe<Array<Wall>>;
};

export type SurfaceAmountsWalls = {
  __typename?: 'SurfaceAmountsWalls';
  public?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Scalars['Int']['output']>;
};

export type SurfaceBoundaries = {
  __typename?: 'SurfaceBoundaries';
  b: Scalars['Float']['output'];
  l: Scalars['Float']['output'];
  r: Scalars['Float']['output'];
  t: Scalars['Float']['output'];
};

export type SurfaceBoundariesDims = {
  __typename?: 'SurfaceBoundariesDims';
  /**  in `mm`  */
  height: Scalars['Int']['output'];
  /**  in `mm`  */
  width: Scalars['Int']['output'];
};

export type SurfaceBoundariesDimsCm = {
  __typename?: 'SurfaceBoundariesDimsCm';
  /**  in `cm`  */
  height: Scalars['Float']['output'];
  /**  in `cm`  */
  width: Scalars['Float']['output'];
};

export type SurfaceCenter = {
  __typename?: 'SurfaceCenter';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

/**
 * type SurfaceCornersUserPoint {
 *   x: Float
 *   y: Float
 * }
 */
export type SurfaceCornersUser = {
  __typename?: 'SurfaceCornersUser';
  bl: SurfaceCornersUserPoint;
  br: SurfaceCornersUserPoint;
  tl: SurfaceCornersUserPoint;
  tr: SurfaceCornersUserPoint;
};

export type SurfaceCornersUserPoint = {
  __typename?: 'SurfaceCornersUserPoint';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

/**
 * type SurfaceCornersUser {
 *   tl: SurfaceCornersUserPoint
 *   tr: SurfaceCornersUserPoint
 *   br: SurfaceCornersUserPoint
 *   bl: SurfaceCornersUserPoint
 * }
 */
export type SurfaceDimensions = {
  __typename?: 'SurfaceDimensions';
  /**  in `mm`  */
  height: Scalars['Int']['output'];
  /**  in `mm`  */
  width: Scalars['Int']['output'];
};

/**
 * type SurfaceDimensions {
 *   " in `mm` "
 *   width: Int
 *   " in `mm` "
 *   height: Int
 * }
 */
export type SurfaceDimensionsCm = {
  __typename?: 'SurfaceDimensionsCm';
  /**  in `cm`  */
  height: Scalars['Float']['output'];
  /**  in `cm`  */
  width: Scalars['Float']['output'];
};

export enum SurfaceFilter {
  HasBoundaries = 'hasBoundaries',
  HasTags = 'hasTags',
  Private = 'private',
  Public = 'public'
}

/**
 * type SurfaceDimensionsCm {
 *   width: Float # cm
 *   height: Float # cm
 * }
 */
export type SurfaceInsets = {
  __typename?: 'SurfaceInsets';
  b: Scalars['Float']['output'];
  l: Scalars['Float']['output'];
  r: Scalars['Float']['output'];
  t: Scalars['Float']['output'];
};

export type SurfaceOriginal = {
  __typename?: 'SurfaceOriginal';
  height?: Maybe<Scalars['Int']['output']>;
  uploaded?: Maybe<Scalars['Boolean']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type SurfacePropsSurface = {
  __typename?: 'SurfacePropsSurface';
  /** `-100` ..   `0`, default: `0`  */
  lightness?: Maybe<Scalars['Int']['output']>;
  /**   -75` ..   `0`, default: `0`  */
  saturation?: Maybe<Scalars['Int']['output']>;
  /**   `10` ..  `50`, default: `30`  */
  shadowAlpha?: Maybe<Scalars['Int']['output']>;
  /** `-180` .. `180`, default: `0`  */
  shadowAngle?: Maybe<Scalars['Int']['output']>;
  /**   `20` ..  `60`, default: `40`  */
  shadowBlurStrength?: Maybe<Scalars['Int']['output']>;
  /**    `0` ..  `20`, default: `10`  */
  shadowDistance?: Maybe<Scalars['Int']['output']>;
};

export enum SurfaceQueryMode {
  All = 'all',
  Own = 'own'
}

export enum SurfaceSortBy {
  /** Newest first */
  Newest = 'newest',
  /** Oldest first */
  Oldest = 'oldest'
}

export type SurfacesAdmins = {
  __typename?: 'SurfacesAdmins';
  amountGalleries: Scalars['Int']['output'];
  amountSurfaces: Scalars['Int']['output'];
  galleries?: Maybe<Array<Gallery>>;
  surfaces?: Maybe<Array<Surface>>;
};

export type SurfacesStats = {
  __typename?: 'SurfacesStats';
  total: Scalars['Int']['output'];
  /** totalIds: [String!]! */
  totalNonAdmins: Scalars['Int']['output'];
  totalNonAdminsIds: Array<Scalars['String']['output']>;
  totalNotOnWalls: Scalars['Int']['output'];
  totalNotOnWallsIds: Array<Scalars['String']['output']>;
};

export type SyncStatus = {
  __typename?: 'SyncStatus';
  action?: Maybe<Scalars['String']['output']>;
  finishTimeReadable?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['Float']['output']>;
  progressPct?: Maybe<Scalars['Float']['output']>;
  startTimeReadable?: Maybe<Scalars['String']['output']>;
  stepsDone?: Maybe<Scalars['Int']['output']>;
  stepsTotal?: Maybe<Scalars['Int']['output']>;
};

export type TabBarLabelsCategorizedInLang = {
  __typename?: 'TabBarLabelsCategorizedInLang';
  /**  **not respecting** overrides  */
  default: TabBarLabelsInLang;
  /**  **respecting** overrides  */
  final: TabBarLabelsInLang;
};

export type TabBarLabelsInLang = {
  __typename?: 'TabBarLabelsInLang';
  /**  **Artists** (single & multi) Tab  */
  Artists: Scalars['String']['output'];
  /**  **Artworks** Tab  */
  Artworks: Scalars['String']['output'];
  /**  **Home** Tab  */
  Home: Scalars['String']['output'];
  /**  **Profile** Tab  */
  Profile: Scalars['String']['output'];
  /**  **Walls** Tab  */
  Walls: Scalars['String']['output'];
};

export type TabBarLabelsInLangs = {
  __typename?: 'TabBarLabelsInLangs';
  de: TabBarLabelsCategorizedInLang;
  en: TabBarLabelsCategorizedInLang;
  es: TabBarLabelsCategorizedInLang;
  fr: TabBarLabelsCategorizedInLang;
};

export type TriggeredNotification = {
  __typename?: 'TriggeredNotification';
  amountType: Scalars['String']['output'];
  singleArtist?: Maybe<Scalars['Boolean']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  useArtistGenders?: Maybe<Scalars['Boolean']['output']>;
  useGalleryGenders?: Maybe<Scalars['Boolean']['output']>;
};

/** [Firebase User](https://console.firebase.google.com/u/1/project/iazzu-1c1f8/authentication/users), identified by its unique Firebase User ID */
export type User = {
  __typename?: 'User';
  /**  Whether the user was defined as an admin in the iazzu WP Backend  */
  admin?: Maybe<Scalars['Boolean']['output']>;
  amountArtistsLiked?: Maybe<Scalars['Int']['output']>;
  amountArtworksExplored?: Maybe<Scalars['Int']['output']>;
  amountArtworksLiked?: Maybe<Scalars['Int']['output']>;
  amountBlogsLiked?: Maybe<Scalars['Int']['output']>;
  amountCoursesLiked?: Maybe<Scalars['Int']['output']>;
  amountEventsLiked?: Maybe<Scalars['Int']['output']>;
  amountExhibitionsLiked?: Maybe<Scalars['Int']['output']>;
  amountGalleriesFollowed?: Maybe<Scalars['Int']['output']>;
  amountGalleriesManaged?: Maybe<Scalars['Int']['output']>;
  amountSurfacesCreated?: Maybe<Scalars['Int']['output']>;
  amountWallsCreated?: Maybe<Scalars['Int']['output']>;
  amountWallsLiked?: Maybe<Scalars['Int']['output']>;
  artistsLiked?: Maybe<Array<Artist>>;
  artworksLiked?: Maybe<Array<Artwork>>;
  /**  When the user signed up for iazzu  */
  created: Scalars['Timestamp']['output'];
  /**  Language-dependent  */
  createdReadable?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
  currencySetOnce: Scalars['Boolean']['output'];
  /**  Display Name set in app (Profile > Settings)  */
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /**  Either verified per email link or already verified because using social auth  */
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  /**  Amount of FCM Tokens this user has stored in Firebase  */
  fcmTokensAmount?: Maybe<Scalars['Int']['output']>;
  galleriesManaged?: Maybe<Array<Gallery>>;
  galleryPasswords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /**  Firebase User ID  */
  id: Scalars['String']['output'];
  lang: Scalars['String']['output'];
  lastActive?: Maybe<Scalars['Timestamp']['output']>;
  /**  Last **manually** set app language (Profile > Settings)  */
  lastActiveAppLang?: Maybe<Scalars['String']['output']>;
  /**  Last Country Code (based on IP address) this user was active in  */
  lastActiveCountryCode?: Maybe<Scalars['String']['output']>;
  /**  User- & language-dependent  */
  lastActiveReadable?: Maybe<Scalars['String']['output']>;
  lastActiveTime?: Maybe<Scalars['Timestamp']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  photoUrlThumb?: Maybe<Scalars['String']['output']>;
  /**  Whether this user was synced once before using `mutation.syncUser`  */
  syncedOnce: Scalars['Boolean']['output'];
  unit: Scalars['String']['output'];
  unitSetOnce: Scalars['Boolean']['output'];
  wallsCreated?: Maybe<Array<Wall>>;
  wallsLiked?: Maybe<Array<Wall>>;
};


/** [Firebase User](https://console.firebase.google.com/u/1/project/iazzu-1c1f8/authentication/users), identified by its unique Firebase User ID */
export type UserArtistsLikedArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ArtistSortBy>;
};


/** [Firebase User](https://console.firebase.google.com/u/1/project/iazzu-1c1f8/authentication/users), identified by its unique Firebase User ID */
export type UserArtworksLikedArgs = {
  currency?: InputMaybe<Currency>;
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ArtworkSortBy>;
  unit?: InputMaybe<DimensionsUnit>;
};


/** [Firebase User](https://console.firebase.google.com/u/1/project/iazzu-1c1f8/authentication/users), identified by its unique Firebase User ID */
export type UserGalleriesManagedArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<GallerySortBy>;
};


/** [Firebase User](https://console.firebase.google.com/u/1/project/iazzu-1c1f8/authentication/users), identified by its unique Firebase User ID */
export type UserWallsCreatedArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<WallSortBy>;
};


/** [Firebase User](https://console.firebase.google.com/u/1/project/iazzu-1c1f8/authentication/users), identified by its unique Firebase User ID */
export type UserWallsLikedArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<WallSortBy>;
};

export type UserArtworkExploredStatus = {
  slug: Scalars['String']['input'];
  status: Scalars['Int']['input'];
  tstamp: Scalars['Float']['input'];
};

export enum UserFilter {
  Anonymous = 'anonymous',
  EmailNotVerified = 'emailNotVerified',
  HasEmail = 'hasEmail',
  HasPhoto = 'hasPhoto'
}

export type UserInteractionsStats = {
  __typename?: 'UserInteractionsStats';
  exploredArtwork?: Maybe<Scalars['Int']['output']>;
  followedGallery?: Maybe<Scalars['Int']['output']>;
  likedArtist?: Maybe<Scalars['Int']['output']>;
  likedArtwork?: Maybe<Scalars['Int']['output']>;
  likedWall?: Maybe<Scalars['Int']['output']>;
  seenArtist?: Maybe<Scalars['Int']['output']>;
  seenArtwork?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UserOwnSettingsInput = {
  currency?: InputMaybe<Currency>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  photoUrlFull?: InputMaybe<Scalars['String']['input']>;
  photoUrlThumb?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<DimensionsUnit>;
};

export enum UserSortBy {
  FirstActive = 'firstActive',
  HasEmail = 'hasEmail',
  LastActive = 'lastActive',
  Newest = 'newest',
  Oldest = 'oldest'
}

/**  Data type of updated User used in [ResSUserUpdated]({{Types.ResSUserUpdated}})  */
export enum UserUpdatedType {
  /**  ✅ After Liked Artists have been changed  */
  LikedArtists = 'likedArtists',
  /**  ✅ After Liked Artworks have been changed  */
  LikedArtworks = 'likedArtworks',
  /**  ✅ After Liked Blogs have been changed  */
  LikedBlogs = 'likedBlogs',
  /**  ✅ After Liked Events have been changed  */
  LikedEvents = 'likedEvents',
  /**  ✅ After User has been synced via `SyncUserHandler` or `SyncUserFcmTokensHandler`  */
  Settings = 'settings',
  /**  ✅ After Wall has been synced via `SyncWallHandler`  */
  Walls = 'walls'
}

export type UserWithMetaTimes = {
  __typename?: 'UserWithMetaTimes';
  created?: Maybe<Scalars['Date']['output']>;
  createdReadable?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['Date']['output']>;
  updatedReadable?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UserWithMetaTimesAndTicks = {
  __typename?: 'UserWithMetaTimesAndTicks';
  /**  First followed  */
  created?: Maybe<Scalars['Date']['output']>;
  /**  First followed, human-readable  */
  createdReadable?: Maybe<Scalars['String']['output']>;
  ticks: Scalars['Int']['output'];
  /**  Last visited  */
  updated?: Maybe<Scalars['Date']['output']>;
  /**  Last visited, human-readable  */
  updatedReadable?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UsersStats = {
  __typename?: 'UsersStats';
  admin: Scalars['Int']['output'];
  adminEmails: Array<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
};

export type Wall = {
  __typename?: 'Wall';
  artistTitle?: Maybe<Scalars['String']['output']>;
  /**  Wall Artwork's **Artist Title(s)**, separated by `,` and `&` if necessary  */
  artistsTitles?: Maybe<Scalars['String']['output']>;
  artwork?: Maybe<Artwork>;
  artworkInGalleryNotAllowingPublicWallsAllUsers?: Maybe<Scalars['Boolean']['output']>;
  artworkSlug: Scalars['String']['output'];
  /**  Wall Artwork's **Title(s)**  */
  artworkTitle?: Maybe<Scalars['String']['output']>;
  artworkVariantIndex?: Maybe<Scalars['Int']['output']>;
  blocked?: Maybe<Scalars['Boolean']['output']>;
  boundaries?: Maybe<SurfaceBoundaries>;
  boundariesDims?: Maybe<SurfaceBoundariesDims>;
  center?: Maybe<SurfaceCenter>;
  cornersUser?: Maybe<SurfaceCornersUser>;
  created?: Maybe<Scalars['Timestamp']['output']>;
  createdBy?: Maybe<User>;
  createdByGalleryManager?: Maybe<Scalars['Boolean']['output']>;
  createdById: Scalars['String']['output'];
  createdByMe?: Maybe<Scalars['Boolean']['output']>;
  createdByRequestingUser?: Maybe<Scalars['Boolean']['output']>;
  createdReadable?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<SurfaceDimensions>;
  galleriesCodes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  galleriesProtectedCodes?: Maybe<Array<Scalars['String']['output']>>;
  /**  Wall Artwork's **Gallery Title(s)**, separated by `,` and `&` if necessary  */
  galleriesTitles?: Maybe<Scalars['String']['output']>;
  /**  `idGeneric`, e.g. 'c71a4bdc17bc0d2c2e6deebc566938fc'  */
  id: Scalars['String']['output'];
  idFirebase: Scalars['String']['output'];
  /**  Uses `lastImageUploadHash`  */
  imageThumbUrl?: Maybe<Scalars['String']['output']>;
  /**  Uses `lastImageUploadHash`  */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /**  Uses `lastImageUploadHash`  */
  imageWebUrl?: Maybe<Scalars['String']['output']>;
  inProtectedGallery?: Maybe<Scalars['Boolean']['output']>;
  insets?: Maybe<SurfaceInsets>;
  lastImageUploadHash?: Maybe<Scalars['String']['output']>;
  original?: Maybe<SurfaceOriginal>;
  propsSurface?: Maybe<SurfacePropsSurface>;
  public?: Maybe<Scalars['Boolean']['output']>;
  stagingOnly?: Maybe<Scalars['Boolean']['output']>;
  surface?: Maybe<Surface>;
  surfaceId: Scalars['String']['output'];
  totalLikes?: Maybe<Array<Maybe<UserWithMetaTimes>>>;
  updated?: Maybe<Scalars['Timestamp']['output']>;
  updatedReadable?: Maybe<Scalars['String']['output']>;
  /**  User-dependent  */
  userAccessData?: Maybe<ProtectedContentUserAccessData>;
  /**  User-dependent  */
  userCanAccessProtectedContent?: Maybe<Scalars['Boolean']['output']>;
  userCanEdit?: Maybe<Scalars['Boolean']['output']>;
  /**  User-dependent  */
  userCanOrCantAccessProtectedContentReason?: Maybe<Scalars['String']['output']>;
  userCanOrCantShareToInstagramReason?: Maybe<Scalars['String']['output']>;
  userCanShareToInstagram?: Maybe<Scalars['Boolean']['output']>;
  userLiked?: Maybe<Scalars['Boolean']['output']>;
  userLikedTime?: Maybe<Scalars['Timestamp']['output']>;
  userLikedTimeReadable?: Maybe<Scalars['String']['output']>;
  userManagesGallery?: Maybe<Scalars['Boolean']['output']>;
  valuesHash?: Maybe<Scalars['String']['output']>;
};


export type WallArtworkArgs = {
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
};


export type WallSurfaceArgs = {
  ignoreUid?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum WallFilter {
  Private = 'private',
  Public = 'public'
}

export type WallInfos = {
  __typename?: 'WallInfos';
  artworkInGalleryNotAllowingPublicWallsAllUsers: Scalars['Boolean']['output'];
  canBeMadePublic: Scalars['Boolean']['output'];
  /**  Whether the combination of Surface and Artwork can be used to create a Wall (only if Surface is a) created by requesting User or b) publically available for Artwork's Gallery)  */
  canBeUsed: Scalars['Boolean']['output'];
  cantBeMadePublicReason?: Maybe<Scalars['String']['output']>;
  userWallExists: Scalars['Boolean']['output'];
  userWallValuesHash?: Maybe<Scalars['String']['output']>;
  walls?: Maybe<Array<Wall>>;
};

export enum WallQueryMode {
  /**  Wall must be either `public` or created by requesting user  */
  Liked = 'liked',
  /**  Wall must be `public` and created by a different User  */
  Others = 'others',
  /**  Wall must be `public`  */
  Public = 'public',
  /**  Wall must be created by requesting User  */
  User = 'user'
}

export enum WallSortBy {
  /** Last liked first (only for logged in users) */
  LastLiked = 'lastLiked',
  /** Newest first */
  Newest = 'newest',
  /** Oldest first */
  Oldest = 'oldest',
  /** Last updated first */
  Updated = 'updated'
}

export type WallsStats = {
  __typename?: 'WallsStats';
  public: Scalars['Int']['output'];
  publicNonAdmins: Scalars['Int']['output'];
  publicNonAdminsIds: Array<Scalars['String']['output']>;
  publicNonAdminsIdsLatest: Array<Scalars['String']['output']>;
  publicNonAdminsNonManagers: Scalars['Int']['output'];
  publicNonAdminsNonManagersIds: Array<Scalars['String']['output']>;
  publicNonAdminsNonManagersIdsLatest: Array<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
  totalNonAdmins: Scalars['Int']['output'];
};

/**  SEO Data with same content as on Website for `GET /postdata?path=/`  */
export type WebSeoData = {
  __typename?: 'WebSeoData';
  /**  `en` | `de` | `es` | `fr`  */
  lang: Scalars['String']['output'];
  /**  Content (localized, without HTML)  */
  ogDescription: Scalars['String']['output'];
  /**  Image URL in `FBSHARE` size  */
  ogImage: Scalars['String']['output'];
  /**  Image height in `FBSHARE` size (ideally `630`)  */
  ogImageHeight: Scalars['Int']['output'];
  /**  Image width in `FBSHARE` size (ideally `1200`)  */
  ogImageWidth: Scalars['Int']['output'];
  /**  `en_US` | `de_DE` | `es_ES` | `fr_FR`  */
  ogLocale: Scalars['String']['output'];
  /**  Always `iazzu`  */
  ogSiteName: Scalars['String']['output'];
  /**  Title with suffix (` | iazzu`)  */
  ogTitle: Scalars['String']['output'];
  /**  Always `website`  */
  ogType: Scalars['String']['output'];
  /**  Working URL to this page  */
  ogUrl: Scalars['String']['output'];
  /**  Title without suffix (` | iazzu`)  */
  titleRaw: Scalars['String']['output'];
  /**  Always `summary`  */
  twitterCard: Scalars['String']['output'];
  /**  Content (localized, without HTML)  */
  twitterDescription: Scalars['String']['output'];
  /**  Image URL  */
  twitterImage: Scalars['String']['output'];
  /**  Title with suffix (` | iazzu`)  */
  twitterTitle: Scalars['String']['output'];
  /**  Working URL to this page  */
  url: Scalars['String']['output'];
};

/**  WordPress Post Status, e.g. `PUBLISH`  */
export enum WpStatus {
  /**  Draft – either set in Backend (WP) or (in case of Artwork) via User Artwork Editor (App)  */
  Draft = 'DRAFT',
  /**  Future  */
  Future = 'FUTURE',
  /**  Privately Published  */
  Private = 'PRIVATE',
  /**  Published  */
  Publish = 'PUBLISH'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AnalyticsEvent: ResolverTypeWrapper<AnalyticsEvent>;
  AnalyticsEventDataEntry: ResolverTypeWrapper<AnalyticsEventDataEntry>;
  AnalyticsEventDataEntryInput: AnalyticsEventDataEntryInput;
  AnalyticsEventOrigin: AnalyticsEventOrigin;
  AnalyticsEventType: AnalyticsEventType;
  AnalyticsEventsFilter: AnalyticsEventsFilter;
  AnalyticsEventsSortBy: AnalyticsEventsSortBy;
  Artist: ResolverTypeWrapper<Artist>;
  ArtistCurriculumEntry: ResolverTypeWrapper<ArtistCurriculumEntry>;
  ArtistFilter: ArtistFilter;
  ArtistGalleryQueryMode: ArtistGalleryQueryMode;
  ArtistSortBy: ArtistSortBy;
  ArtistsStats: ResolverTypeWrapper<ArtistsStats>;
  Artwork: ResolverTypeWrapper<Artwork>;
  ArtworkAvailabilityStatus: ArtworkAvailabilityStatus;
  ArtworkCategoriesStats: ResolverTypeWrapper<ArtworkCategoriesStats>;
  ArtworkCategory: ResolverTypeWrapper<ArtworkCategory>;
  ArtworkCategoryParentType: ArtworkCategoryParentType;
  ArtworkDimensions: ResolverTypeWrapper<ArtworkDimensions>;
  ArtworkFilter: ArtworkFilter;
  ArtworkFilterValuesColor: ResolverTypeWrapper<ArtworkFilterValuesColor>;
  ArtworkFilterValuesMaterial: ResolverTypeWrapper<ArtworkFilterValuesMaterial>;
  ArtworkFilterValuesTechnique: ResolverTypeWrapper<ArtworkFilterValuesTechnique>;
  ArtworkGalleryQueryMode: ArtworkGalleryQueryMode;
  ArtworkMaterial: ResolverTypeWrapper<ArtworkMaterial>;
  ArtworkMaterialOrTechniqueToFix: ResolverTypeWrapper<ArtworkMaterialOrTechniqueToFix>;
  ArtworkMaterialOrTechniqueToFixSlugsDetails: ResolverTypeWrapper<ArtworkMaterialOrTechniqueToFixSlugsDetails>;
  ArtworkMaterialsOrTechniquesToFix: ResolverTypeWrapper<ArtworkMaterialsOrTechniquesToFix>;
  ArtworkMaterialsStats: ResolverTypeWrapper<ArtworkMaterialsStats>;
  ArtworkOriginalImage: ResolverTypeWrapper<ArtworkOriginalImage>;
  ArtworkSortBy: ArtworkSortBy;
  ArtworkTechnique: ResolverTypeWrapper<ArtworkTechnique>;
  ArtworkTechniquesStats: ResolverTypeWrapper<ArtworkTechniquesStats>;
  ArtworkVariant: ResolverTypeWrapper<ArtworkVariant>;
  ArtworksDefaultGallery: ResolverTypeWrapper<ArtworksDefaultGallery>;
  ArtworksFilterValues: ResolverTypeWrapper<ArtworksFilterValues>;
  ArtworksStats: ResolverTypeWrapper<ArtworksStats>;
  AuthTokenInfo: ResolverTypeWrapper<AuthTokenInfo>;
  AuthTokenInfoTokenInfos: ResolverTypeWrapper<AuthTokenInfoTokenInfos>;
  AvailabilityStati: ResolverTypeWrapper<AvailabilityStati>;
  AvailabilityStatusSingle: ResolverTypeWrapper<AvailabilityStatusSingle>;
  Blog: ResolverTypeWrapper<Blog>;
  BlogFilter: BlogFilter;
  BlogLink: ResolverTypeWrapper<BlogLink>;
  BlogSortBy: BlogSortBy;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BranchLink: ResolverTypeWrapper<BranchLink>;
  BranchLinkDebugData: ResolverTypeWrapper<BranchLinkDebugData>;
  BranchLinkQrData: ResolverTypeWrapper<BranchLinkQrData>;
  BranchLinkSeoData: ResolverTypeWrapper<BranchLinkSeoData>;
  BranchUrlInfos: ResolverTypeWrapper<BranchUrlInfos>;
  CantBeConvertedFromWpReason: CantBeConvertedFromWpReason;
  ClientPlatform: ClientPlatform;
  Contact: ResolverTypeWrapper<Contact>;
  ContactParentType: ContactParentType;
  Countries: ResolverTypeWrapper<Countries>;
  CountrySingle: ResolverTypeWrapper<CountrySingle>;
  Currency: Currency;
  CurrencyConverted: ResolverTypeWrapper<CurrencyConverted>;
  CurrencyConvertedValue: ResolverTypeWrapper<CurrencyConvertedValue>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateStartEndParts: ResolverTypeWrapper<DateStartEndParts>;
  DbObjectId: ResolverTypeWrapper<Scalars['DbObjectId']['output']>;
  DebugValue: ResolverTypeWrapper<DebugValue>;
  DimensionsUnit: DimensionsUnit;
  Event: ResolverTypeWrapper<Event>;
  EventCategories: ResolverTypeWrapper<EventCategories>;
  EventCategory: ResolverTypeWrapper<EventCategory>;
  EventDateStartEndPartsType: EventDateStartEndPartsType;
  EventEra: EventEra;
  EventFilter: EventFilter;
  EventFilterTimeRange: EventFilterTimeRange;
  EventFilterValueCategory: ResolverTypeWrapper<EventFilterValueCategory>;
  EventFilterValueCityEntry: ResolverTypeWrapper<EventFilterValueCityEntry>;
  EventFilterValueTimeRange: ResolverTypeWrapper<EventFilterValueTimeRange>;
  EventQueryMode: EventQueryMode;
  EventSortBy: EventSortBy;
  EventsFilterValues: ResolverTypeWrapper<EventsFilterValues>;
  EventsStats: ResolverTypeWrapper<EventsStats>;
  ExternalOrganizer: ResolverTypeWrapper<ExternalOrganizer>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GalleriesStats: ResolverTypeWrapper<GalleriesStats>;
  Gallery: ResolverTypeWrapper<Gallery>;
  GalleryAnalytics: ResolverTypeWrapper<GalleryAnalytics>;
  GalleryAnalyticsArrayRangeType: GalleryAnalyticsArrayRangeType;
  GalleryAnalyticsFollowers: ResolverTypeWrapper<GalleryAnalyticsFollowers>;
  GalleryAnalyticsFollowersSingle: ResolverTypeWrapper<GalleryAnalyticsFollowersSingle>;
  GalleryAnalyticsFollowersValue: ResolverTypeWrapper<GalleryAnalyticsFollowersValue>;
  GalleryAnalyticsPublications: ResolverTypeWrapper<GalleryAnalyticsPublications>;
  GalleryAnalyticsPublicationsSingle: ResolverTypeWrapper<GalleryAnalyticsPublicationsSingle>;
  GalleryAnalyticsPublicationsValue: ResolverTypeWrapper<GalleryAnalyticsPublicationsValue>;
  GalleryAnalyticsRangeType: GalleryAnalyticsRangeType;
  GalleryAnalyticsRangeValues: ResolverTypeWrapper<GalleryAnalyticsRangeValues>;
  GalleryAnalyticsRangeValuesLabel: ResolverTypeWrapper<GalleryAnalyticsRangeValuesLabel>;
  GalleryAnalyticsRangeValuesStartEnd: ResolverTypeWrapper<GalleryAnalyticsRangeValuesStartEnd>;
  GalleryBasic: ResolverTypeWrapper<GalleryBasic>;
  GalleryBilling: ResolverTypeWrapper<GalleryBilling>;
  GalleryBillingContractNetGain: ResolverTypeWrapper<GalleryBillingContractNetGain>;
  GalleryBillingContractNetGainPart: ResolverTypeWrapper<GalleryBillingContractNetGainPart>;
  GalleryBillingContracts: ResolverTypeWrapper<GalleryBillingContracts>;
  GalleryBillingContractsNextRenewalCosts: ResolverTypeWrapper<GalleryBillingContractsNextRenewalCosts>;
  GalleryBrandingInfos: ResolverTypeWrapper<GalleryBrandingInfos>;
  GalleryBrandingInfosLaunchScreenLogoType: GalleryBrandingInfosLaunchScreenLogoType;
  GalleryFilter: GalleryFilter;
  GalleryFollowersSortBy: GalleryFollowersSortBy;
  GalleryGender: GalleryGender;
  GalleryManagedWithFollowers: ResolverTypeWrapper<GalleryManagedWithFollowers>;
  GalleryOneTimeCharge: ResolverTypeWrapper<GalleryOneTimeCharge>;
  GalleryPackage: ResolverTypeWrapper<GalleryPackage>;
  GalleryPackageType: GalleryPackageType;
  GalleryPreview: ResolverTypeWrapper<GalleryPreview>;
  GalleryProtectionData: ResolverTypeWrapper<GalleryProtectionData>;
  GalleryProtectionDataEmailRule: ResolverTypeWrapper<GalleryProtectionDataEmailRule>;
  GalleryProtectionDataEmailRuleInput: GalleryProtectionDataEmailRuleInput;
  GalleryProtectionDataPassword: ResolverTypeWrapper<GalleryProtectionDataPassword>;
  GalleryProtectionDataPasswordInput: GalleryProtectionDataPasswordInput;
  GallerySortBy: GallerySortBy;
  GalleryTabBarLabel: ResolverTypeWrapper<GalleryTabBarLabel>;
  GalleryUpdatedType: GalleryUpdatedType;
  GeoCoordinates: ResolverTypeWrapper<GeoCoordinates>;
  GooglePlaceById: ResolverTypeWrapper<GooglePlaceById>;
  GooglePlacesBySearch: ResolverTypeWrapper<GooglePlacesBySearch>;
  GooglePlacesBySearchResult: ResolverTypeWrapper<GooglePlacesBySearchResult>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  ImageSingle: ResolverTypeWrapper<ImageSingle>;
  ImageSize: ResolverTypeWrapper<ImageSize>;
  ImageSizeSize: ImageSizeSize;
  ImageWp: ResolverTypeWrapper<ImageWp>;
  ImageWpSizes: ResolverTypeWrapper<ImageWpSizes>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Link: ResolverTypeWrapper<Link>;
  LinkType: LinkType;
  Location: ResolverTypeWrapper<Location>;
  LocationLatLng: ResolverTypeWrapper<LocationLatLng>;
  LocationSearch: ResolverTypeWrapper<LocationSearch>;
  LocationType: LocationType;
  Mutation: ResolverTypeWrapper<{}>;
  OpeningHoursEntry: ResolverTypeWrapper<OpeningHoursEntry>;
  ProfileInfos: ResolverTypeWrapper<ProfileInfos>;
  ProfileInfosRequestEntry: ProfileInfosRequestEntry;
  ProfileInfosTypeExtras: ResolverTypeWrapper<ProfileInfosTypeExtras>;
  ProtectedContentUserAccessData: ResolverTypeWrapper<ProtectedContentUserAccessData>;
  Query: ResolverTypeWrapper<{}>;
  ResMAddAnalyticsEvent: ResolverTypeWrapper<ResMAddAnalyticsEvent>;
  ResMAddUserConversationMessage: ResolverTypeWrapper<ResMAddUserConversationMessage>;
  ResMAddUserGalleryCode: ResolverTypeWrapper<ResMAddUserGalleryCode>;
  ResMAddUserGalleryTick: ResolverTypeWrapper<ResMAddUserGalleryTick>;
  ResMCleanUser: ResolverTypeWrapper<ResMCleanUser>;
  ResMCleanUserConversations: ResolverTypeWrapper<ResMCleanUserConversations>;
  ResMCleanUserFollowedGalleries: ResolverTypeWrapper<ResMCleanUserFollowedGalleries>;
  ResMCleanUserNotifications: ResolverTypeWrapper<ResMCleanUserNotifications>;
  ResMCleanUserSurfaces: ResolverTypeWrapper<ResMCleanUserSurfaces>;
  ResMDeleteArtwork: ResolverTypeWrapper<ResMDeleteArtwork>;
  ResMDeleteSurface: ResolverTypeWrapper<ResMDeleteSurface>;
  ResMDeleteUserAccount: ResolverTypeWrapper<ResMDeleteUserAccount>;
  ResMDeleteWall: ResolverTypeWrapper<ResMDeleteWall>;
  ResMMergeUsersFollowedGalleries: ResolverTypeWrapper<ResMMergeUsersFollowedGalleries>;
  ResMRemoveUserGalleryCode: ResolverTypeWrapper<ResMRemoveUserGalleryCode>;
  ResMReportChatAbuse: ResolverTypeWrapper<ResMReportChatAbuse>;
  ResMSetDebugValue: ResolverTypeWrapper<ResMSetDebugValue>;
  ResMSetGalleryProtectionData: ResolverTypeWrapper<ResMSetGalleryProtectionData>;
  ResMSetSurfaceTags: ResolverTypeWrapper<ResMSetSurfaceTags>;
  ResMSetUserArtistLiked: ResolverTypeWrapper<ResMSetUserArtistLiked>;
  ResMSetUserArtistSeen: ResolverTypeWrapper<ResMSetUserArtistSeen>;
  ResMSetUserArtworkData: ResolverTypeWrapper<ResMSetUserArtworkData>;
  ResMSetUserArtworkLiked: ResolverTypeWrapper<ResMSetUserArtworkLiked>;
  ResMSetUserArtworkSeen: ResolverTypeWrapper<ResMSetUserArtworkSeen>;
  ResMSetUserArtworksExploreStati: ResolverTypeWrapper<ResMSetUserArtworksExploreStati>;
  ResMSetUserBlogLiked: ResolverTypeWrapper<ResMSetUserBlogLiked>;
  ResMSetUserBlogSeen: ResolverTypeWrapper<ResMSetUserBlogSeen>;
  ResMSetUserEventLiked: ResolverTypeWrapper<ResMSetUserEventLiked>;
  ResMSetUserEventSeen: ResolverTypeWrapper<ResMSetUserEventSeen>;
  ResMSetUserGalleryFavorited: ResolverTypeWrapper<ResMSetUserGalleryFavorited>;
  ResMSetUserGalleryPassword: ResolverTypeWrapper<ResMSetUserGalleryPassword>;
  ResMSetUserOwnSettings: ResolverTypeWrapper<ResMSetUserOwnSettings>;
  ResMSetUserSurfaceData: ResolverTypeWrapper<ResMSetUserSurfaceData>;
  ResMSetUserWallData: ResolverTypeWrapper<ResMSetUserWallData>;
  ResMSetUserWallLiked: ResolverTypeWrapper<ResMSetUserWallLiked>;
  ResSArtistUpdated: ResolverTypeWrapper<ResSArtistUpdated>;
  ResSArtworkUpdated: ResolverTypeWrapper<ResSArtworkUpdated>;
  ResSGalleryUpdated: ResolverTypeWrapper<ResSGalleryUpdated>;
  ResSSurfaceUpdated: ResolverTypeWrapper<ResSSurfaceUpdated>;
  ResSUserUpdated: ResolverTypeWrapper<ResSUserUpdated>;
  ResSWallUpdated: ResolverTypeWrapper<ResSWallUpdated>;
  SlugsInLangs: ResolverTypeWrapper<SlugsInLangs>;
  SpectaQLOption: SpectaQlOption;
  Stats: ResolverTypeWrapper<Stats>;
  Status: ResolverTypeWrapper<Status>;
  StreamItem: ResolverTypeWrapper<StreamItem>;
  StreamItemGallery: ResolverTypeWrapper<StreamItemGallery>;
  StreamItemMeta: ResolverTypeWrapper<StreamItemMeta>;
  StreamItemType: StreamItemType;
  StreamItemTypeData: ResolverTypeWrapper<StreamItemTypeData>;
  StreamItems: ResolverTypeWrapper<StreamItems>;
  StreamItemsFilterValues: ResolverTypeWrapper<StreamItemsFilterValues>;
  StreamItemsPagination: ResolverTypeWrapper<StreamItemsPagination>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringInLangs: ResolverTypeWrapper<StringInLangs>;
  Subscription: ResolverTypeWrapper<{}>;
  Surface: ResolverTypeWrapper<Surface>;
  SurfaceAmountsWalls: ResolverTypeWrapper<SurfaceAmountsWalls>;
  SurfaceBoundaries: ResolverTypeWrapper<SurfaceBoundaries>;
  SurfaceBoundariesDims: ResolverTypeWrapper<SurfaceBoundariesDims>;
  SurfaceBoundariesDimsCm: ResolverTypeWrapper<SurfaceBoundariesDimsCm>;
  SurfaceCenter: ResolverTypeWrapper<SurfaceCenter>;
  SurfaceCornersUser: ResolverTypeWrapper<SurfaceCornersUser>;
  SurfaceCornersUserPoint: ResolverTypeWrapper<SurfaceCornersUserPoint>;
  SurfaceDimensions: ResolverTypeWrapper<SurfaceDimensions>;
  SurfaceDimensionsCm: ResolverTypeWrapper<SurfaceDimensionsCm>;
  SurfaceFilter: SurfaceFilter;
  SurfaceInsets: ResolverTypeWrapper<SurfaceInsets>;
  SurfaceOriginal: ResolverTypeWrapper<SurfaceOriginal>;
  SurfacePropsSurface: ResolverTypeWrapper<SurfacePropsSurface>;
  SurfaceQueryMode: SurfaceQueryMode;
  SurfaceSortBy: SurfaceSortBy;
  SurfacesAdmins: ResolverTypeWrapper<SurfacesAdmins>;
  SurfacesStats: ResolverTypeWrapper<SurfacesStats>;
  SyncStatus: ResolverTypeWrapper<SyncStatus>;
  TabBarLabelsCategorizedInLang: ResolverTypeWrapper<TabBarLabelsCategorizedInLang>;
  TabBarLabelsInLang: ResolverTypeWrapper<TabBarLabelsInLang>;
  TabBarLabelsInLangs: ResolverTypeWrapper<TabBarLabelsInLangs>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TriggeredNotification: ResolverTypeWrapper<TriggeredNotification>;
  User: ResolverTypeWrapper<User>;
  UserArtworkExploredStatus: UserArtworkExploredStatus;
  UserFilter: UserFilter;
  UserInteractionsStats: ResolverTypeWrapper<UserInteractionsStats>;
  UserOwnSettingsInput: UserOwnSettingsInput;
  UserSortBy: UserSortBy;
  UserUpdatedType: UserUpdatedType;
  UserWithMetaTimes: ResolverTypeWrapper<UserWithMetaTimes>;
  UserWithMetaTimesAndTicks: ResolverTypeWrapper<UserWithMetaTimesAndTicks>;
  UsersStats: ResolverTypeWrapper<UsersStats>;
  Wall: ResolverTypeWrapper<Wall>;
  WallFilter: WallFilter;
  WallInfos: ResolverTypeWrapper<WallInfos>;
  WallQueryMode: WallQueryMode;
  WallSortBy: WallSortBy;
  WallsStats: ResolverTypeWrapper<WallsStats>;
  WebSeoData: ResolverTypeWrapper<WebSeoData>;
  WpStatus: WpStatus;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AnalyticsEvent: AnalyticsEvent;
  AnalyticsEventDataEntry: AnalyticsEventDataEntry;
  AnalyticsEventDataEntryInput: AnalyticsEventDataEntryInput;
  Artist: Artist;
  ArtistCurriculumEntry: ArtistCurriculumEntry;
  ArtistsStats: ArtistsStats;
  Artwork: Artwork;
  ArtworkCategoriesStats: ArtworkCategoriesStats;
  ArtworkCategory: ArtworkCategory;
  ArtworkDimensions: ArtworkDimensions;
  ArtworkFilterValuesColor: ArtworkFilterValuesColor;
  ArtworkFilterValuesMaterial: ArtworkFilterValuesMaterial;
  ArtworkFilterValuesTechnique: ArtworkFilterValuesTechnique;
  ArtworkMaterial: ArtworkMaterial;
  ArtworkMaterialOrTechniqueToFix: ArtworkMaterialOrTechniqueToFix;
  ArtworkMaterialOrTechniqueToFixSlugsDetails: ArtworkMaterialOrTechniqueToFixSlugsDetails;
  ArtworkMaterialsOrTechniquesToFix: ArtworkMaterialsOrTechniquesToFix;
  ArtworkMaterialsStats: ArtworkMaterialsStats;
  ArtworkOriginalImage: ArtworkOriginalImage;
  ArtworkTechnique: ArtworkTechnique;
  ArtworkTechniquesStats: ArtworkTechniquesStats;
  ArtworkVariant: ArtworkVariant;
  ArtworksDefaultGallery: ArtworksDefaultGallery;
  ArtworksFilterValues: ArtworksFilterValues;
  ArtworksStats: ArtworksStats;
  AuthTokenInfo: AuthTokenInfo;
  AuthTokenInfoTokenInfos: AuthTokenInfoTokenInfos;
  AvailabilityStati: AvailabilityStati;
  AvailabilityStatusSingle: AvailabilityStatusSingle;
  Blog: Blog;
  BlogLink: BlogLink;
  Boolean: Scalars['Boolean']['output'];
  BranchLink: BranchLink;
  BranchLinkDebugData: BranchLinkDebugData;
  BranchLinkQrData: BranchLinkQrData;
  BranchLinkSeoData: BranchLinkSeoData;
  BranchUrlInfos: BranchUrlInfos;
  Contact: Contact;
  Countries: Countries;
  CountrySingle: CountrySingle;
  CurrencyConverted: CurrencyConverted;
  CurrencyConvertedValue: CurrencyConvertedValue;
  Date: Scalars['Date']['output'];
  DateStartEndParts: DateStartEndParts;
  DbObjectId: Scalars['DbObjectId']['output'];
  DebugValue: DebugValue;
  Event: Event;
  EventCategories: EventCategories;
  EventCategory: EventCategory;
  EventFilterValueCategory: EventFilterValueCategory;
  EventFilterValueCityEntry: EventFilterValueCityEntry;
  EventFilterValueTimeRange: EventFilterValueTimeRange;
  EventsFilterValues: EventsFilterValues;
  EventsStats: EventsStats;
  ExternalOrganizer: ExternalOrganizer;
  Float: Scalars['Float']['output'];
  GalleriesStats: GalleriesStats;
  Gallery: Gallery;
  GalleryAnalytics: GalleryAnalytics;
  GalleryAnalyticsFollowers: GalleryAnalyticsFollowers;
  GalleryAnalyticsFollowersSingle: GalleryAnalyticsFollowersSingle;
  GalleryAnalyticsFollowersValue: GalleryAnalyticsFollowersValue;
  GalleryAnalyticsPublications: GalleryAnalyticsPublications;
  GalleryAnalyticsPublicationsSingle: GalleryAnalyticsPublicationsSingle;
  GalleryAnalyticsPublicationsValue: GalleryAnalyticsPublicationsValue;
  GalleryAnalyticsRangeValues: GalleryAnalyticsRangeValues;
  GalleryAnalyticsRangeValuesLabel: GalleryAnalyticsRangeValuesLabel;
  GalleryAnalyticsRangeValuesStartEnd: GalleryAnalyticsRangeValuesStartEnd;
  GalleryBasic: GalleryBasic;
  GalleryBilling: GalleryBilling;
  GalleryBillingContractNetGain: GalleryBillingContractNetGain;
  GalleryBillingContractNetGainPart: GalleryBillingContractNetGainPart;
  GalleryBillingContracts: GalleryBillingContracts;
  GalleryBillingContractsNextRenewalCosts: GalleryBillingContractsNextRenewalCosts;
  GalleryBrandingInfos: GalleryBrandingInfos;
  GalleryManagedWithFollowers: GalleryManagedWithFollowers;
  GalleryOneTimeCharge: GalleryOneTimeCharge;
  GalleryPackage: GalleryPackage;
  GalleryPreview: GalleryPreview;
  GalleryProtectionData: GalleryProtectionData;
  GalleryProtectionDataEmailRule: GalleryProtectionDataEmailRule;
  GalleryProtectionDataEmailRuleInput: GalleryProtectionDataEmailRuleInput;
  GalleryProtectionDataPassword: GalleryProtectionDataPassword;
  GalleryProtectionDataPasswordInput: GalleryProtectionDataPasswordInput;
  GalleryTabBarLabel: GalleryTabBarLabel;
  GeoCoordinates: GeoCoordinates;
  GooglePlaceById: GooglePlaceById;
  GooglePlacesBySearch: GooglePlacesBySearch;
  GooglePlacesBySearchResult: GooglePlacesBySearchResult;
  ID: Scalars['ID']['output'];
  Image: Image;
  ImageSingle: ImageSingle;
  ImageSize: ImageSize;
  ImageWp: ImageWp;
  ImageWpSizes: ImageWpSizes;
  Int: Scalars['Int']['output'];
  Link: Link;
  Location: Location;
  LocationLatLng: LocationLatLng;
  LocationSearch: LocationSearch;
  Mutation: {};
  OpeningHoursEntry: OpeningHoursEntry;
  ProfileInfos: ProfileInfos;
  ProfileInfosRequestEntry: ProfileInfosRequestEntry;
  ProfileInfosTypeExtras: ProfileInfosTypeExtras;
  ProtectedContentUserAccessData: ProtectedContentUserAccessData;
  Query: {};
  ResMAddAnalyticsEvent: ResMAddAnalyticsEvent;
  ResMAddUserConversationMessage: ResMAddUserConversationMessage;
  ResMAddUserGalleryCode: ResMAddUserGalleryCode;
  ResMAddUserGalleryTick: ResMAddUserGalleryTick;
  ResMCleanUser: ResMCleanUser;
  ResMCleanUserConversations: ResMCleanUserConversations;
  ResMCleanUserFollowedGalleries: ResMCleanUserFollowedGalleries;
  ResMCleanUserNotifications: ResMCleanUserNotifications;
  ResMCleanUserSurfaces: ResMCleanUserSurfaces;
  ResMDeleteArtwork: ResMDeleteArtwork;
  ResMDeleteSurface: ResMDeleteSurface;
  ResMDeleteUserAccount: ResMDeleteUserAccount;
  ResMDeleteWall: ResMDeleteWall;
  ResMMergeUsersFollowedGalleries: ResMMergeUsersFollowedGalleries;
  ResMRemoveUserGalleryCode: ResMRemoveUserGalleryCode;
  ResMReportChatAbuse: ResMReportChatAbuse;
  ResMSetDebugValue: ResMSetDebugValue;
  ResMSetGalleryProtectionData: ResMSetGalleryProtectionData;
  ResMSetSurfaceTags: ResMSetSurfaceTags;
  ResMSetUserArtistLiked: ResMSetUserArtistLiked;
  ResMSetUserArtistSeen: ResMSetUserArtistSeen;
  ResMSetUserArtworkData: ResMSetUserArtworkData;
  ResMSetUserArtworkLiked: ResMSetUserArtworkLiked;
  ResMSetUserArtworkSeen: ResMSetUserArtworkSeen;
  ResMSetUserArtworksExploreStati: ResMSetUserArtworksExploreStati;
  ResMSetUserBlogLiked: ResMSetUserBlogLiked;
  ResMSetUserBlogSeen: ResMSetUserBlogSeen;
  ResMSetUserEventLiked: ResMSetUserEventLiked;
  ResMSetUserEventSeen: ResMSetUserEventSeen;
  ResMSetUserGalleryFavorited: ResMSetUserGalleryFavorited;
  ResMSetUserGalleryPassword: ResMSetUserGalleryPassword;
  ResMSetUserOwnSettings: ResMSetUserOwnSettings;
  ResMSetUserSurfaceData: ResMSetUserSurfaceData;
  ResMSetUserWallData: ResMSetUserWallData;
  ResMSetUserWallLiked: ResMSetUserWallLiked;
  ResSArtistUpdated: ResSArtistUpdated;
  ResSArtworkUpdated: ResSArtworkUpdated;
  ResSGalleryUpdated: ResSGalleryUpdated;
  ResSSurfaceUpdated: ResSSurfaceUpdated;
  ResSUserUpdated: ResSUserUpdated;
  ResSWallUpdated: ResSWallUpdated;
  SlugsInLangs: SlugsInLangs;
  SpectaQLOption: SpectaQlOption;
  Stats: Stats;
  Status: Status;
  StreamItem: StreamItem;
  StreamItemGallery: StreamItemGallery;
  StreamItemMeta: StreamItemMeta;
  StreamItemTypeData: StreamItemTypeData;
  StreamItems: StreamItems;
  StreamItemsFilterValues: StreamItemsFilterValues;
  StreamItemsPagination: StreamItemsPagination;
  String: Scalars['String']['output'];
  StringInLangs: StringInLangs;
  Subscription: {};
  Surface: Surface;
  SurfaceAmountsWalls: SurfaceAmountsWalls;
  SurfaceBoundaries: SurfaceBoundaries;
  SurfaceBoundariesDims: SurfaceBoundariesDims;
  SurfaceBoundariesDimsCm: SurfaceBoundariesDimsCm;
  SurfaceCenter: SurfaceCenter;
  SurfaceCornersUser: SurfaceCornersUser;
  SurfaceCornersUserPoint: SurfaceCornersUserPoint;
  SurfaceDimensions: SurfaceDimensions;
  SurfaceDimensionsCm: SurfaceDimensionsCm;
  SurfaceInsets: SurfaceInsets;
  SurfaceOriginal: SurfaceOriginal;
  SurfacePropsSurface: SurfacePropsSurface;
  SurfacesAdmins: SurfacesAdmins;
  SurfacesStats: SurfacesStats;
  SyncStatus: SyncStatus;
  TabBarLabelsCategorizedInLang: TabBarLabelsCategorizedInLang;
  TabBarLabelsInLang: TabBarLabelsInLang;
  TabBarLabelsInLangs: TabBarLabelsInLangs;
  Timestamp: Scalars['Timestamp']['output'];
  TriggeredNotification: TriggeredNotification;
  User: User;
  UserArtworkExploredStatus: UserArtworkExploredStatus;
  UserInteractionsStats: UserInteractionsStats;
  UserOwnSettingsInput: UserOwnSettingsInput;
  UserWithMetaTimes: UserWithMetaTimes;
  UserWithMetaTimesAndTicks: UserWithMetaTimesAndTicks;
  UsersStats: UsersStats;
  Wall: Wall;
  WallInfos: WallInfos;
  WallsStats: WallsStats;
  WebSeoData: WebSeoData;
}>;

export type SpectaqlDirectiveArgs = {
  options?: Maybe<Array<Maybe<SpectaQlOption>>>;
};

export type SpectaqlDirectiveResolver<Result, Parent, ContextType = any, Args = SpectaqlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AnalyticsEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsEvent'] = ResolversParentTypes['AnalyticsEvent']> = ResolversObject<{
  added?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  addedReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['AnalyticsEventDataEntry']>, ParentType, ContextType>;
  ip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['AnalyticsEventOrigin'], ParentType, ContextType>;
  platform?: Resolver<Maybe<ResolversTypes['ClientPlatform']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AnalyticsEventType'], ParentType, ContextType>;
  typeKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AnalyticsEventDataEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['AnalyticsEventDataEntry'] = ResolversParentTypes['AnalyticsEventDataEntry']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  val?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = ResolversObject<{
  additionalImages?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType, Partial<ArtistAdditionalImagesArgs>>;
  additionalImagesIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesThumbUrls?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesUrls?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesWp?: Resolver<Maybe<Array<ResolversTypes['ImageWp']>>, ParentType, ContextType>;
  amountArtworks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountArtworksDraft?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artworks?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, Partial<ArtistArtworksArgs>>;
  artworksIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtistContentArgs>>;
  contentsHtml?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  contentsMd?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtistCountryArgs>>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  createdReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdReadableShort?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  curriculum?: Resolver<Maybe<Array<ResolversTypes['ArtistCurriculumEntry']>>, ParentType, ContextType, Partial<ArtistCurriculumArgs>>;
  featuredImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, Partial<ArtistFeaturedImageArgs>>;
  featuredImageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtistFeaturedImageUrlArgs>>;
  featuredImageWp?: Resolver<Maybe<ResolversTypes['ImageWp']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  galleries?: Resolver<Maybe<Array<ResolversTypes['Gallery']>>, ParentType, ContextType, Partial<ArtistGalleriesArgs>>;
  galleriesCodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  galleriesManaged?: Resolver<Maybe<Array<ResolversTypes['Gallery']>>, ParentType, ContextType>;
  galleriesProtectedCodes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  galleryChatCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasAdditionalImages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  heroVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  heroVideoYoutubeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inListedGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  inProtectedGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isNew?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  links?: Resolver<Maybe<Array<ResolversTypes['Link']>>, ParentType, ContextType>;
  listed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  seoData?: Resolver<Maybe<ResolversTypes['WebSeoData']>, ParentType, ContextType, Partial<ArtistSeoDataArgs>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stagingOnly?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WpStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  titleCityCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalLikes?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserWithMetaTimes']>>>, ParentType, ContextType, Partial<ArtistTotalLikesArgs>>;
  totalLikesAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSeens?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserWithMetaTimes']>>>, ParentType, ContextType, Partial<ArtistTotalSeensArgs>>;
  totalSeensAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userAccessData?: Resolver<Maybe<ResolversTypes['ProtectedContentUserAccessData']>, ParentType, ContextType>;
  userCanAccessProtectedContent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanOrCantAccessProtectedContentReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userLikedTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userLikedTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userManagesGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSeenTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userSeenTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistCurriculumEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtistCurriculumEntry'] = ResolversParentTypes['ArtistCurriculumEntry']> = ResolversObject<{
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yearString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtistsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtistsStats'] = ResolversParentTypes['ArtistsStats']> = ResolversObject<{
  listed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  protected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  protectedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  stagingOnly?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stagingOnlyIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Artwork'] = ResolversParentTypes['Artwork']> = ResolversObject<{
  _variantIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  additionalImages?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType, Partial<ArtworkAdditionalImagesArgs>>;
  additionalImagesIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesWp?: Resolver<Maybe<Array<ResolversTypes['ImageWp']>>, ParentType, ContextType>;
  amountMaterials?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amountTechniques?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  areaCm?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artists?: Resolver<Maybe<Array<ResolversTypes['Artist']>>, ParentType, ContextType, Partial<ArtworkArtistsArgs>>;
  artistsSlugs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  artistsTitles?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artistsTitlesCitiesCountries?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authCertificate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availabilityStatus?: Resolver<ResolversTypes['ArtworkAvailabilityStatus'], ParentType, ContextType>;
  availabilityStatusReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  availabilityStatusWp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cantBeConvertedFromWpReason?: Resolver<Maybe<ResolversTypes['CantBeConvertedFromWpReason']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArtworkCategory']>>>, ParentType, ContextType>;
  categoriesIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  categoriesTitles?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkContentArgs>>;
  contentsHtml?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  contentsMd?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  convertedFromWp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkCountryArgs>>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkCountryCodeArgs>>;
  created?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdReadableShort?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currencyGallery?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  dimensions?: Resolver<Maybe<ResolversTypes['ArtworkDimensions']>, ParentType, ContextType>;
  dimensionsHeightReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkDimensionsHeightReadableArgs>>;
  dimensionsReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkDimensionsReadableArgs>>;
  dimensionsWidthReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkDimensionsWidthReadableArgs>>;
  dominantColors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  edition?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  editionInfos?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkEditionInfosArgs>>;
  editionInfosHtml?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  editionInfosMd?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  featuredImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, Partial<ArtworkFeaturedImageArgs>>;
  featuredImageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<ArtworkFeaturedImageUrlArgs>>;
  featuredImageWp?: Resolver<Maybe<ResolversTypes['ImageWp']>, ParentType, ContextType>;
  floorBased?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  galleries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gallery']>>>, ParentType, ContextType, Partial<ArtworkGalleriesArgs>>;
  galleriesCodes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  galleriesProtectedCodes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  galleriesTitles?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasAdditionalImages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasVariants?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  heroVideoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inGalleryNotAllowingPublicWallsAllUsers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  inGalleryWithHiddenArtworkPrices?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  inListedGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  inProtectedGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  internalNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inventoryNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isNew?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  materials?: Resolver<Maybe<Array<ResolversTypes['ArtworkMaterial']>>, ParentType, ContextType>;
  materialsReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  materialsSlugs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  maximumRandomLikes?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  notPlanar?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  originalImage?: Resolver<Maybe<ResolversTypes['ArtworkOriginalImage']>, ParentType, ContextType>;
  planar?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceCurrency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  priceCurrencyValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceDisplayable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  priceEuro?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceEuroSortMax?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceEuroSortMin?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceExact?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceIsExact?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  priceReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priceReadableByStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicWalls?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType>;
  purchaseLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  randomNumberBySlug?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  readyToHang?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  seoData?: Resolver<Maybe<ResolversTypes['WebSeoData']>, ParentType, ContextType, Partial<ArtworkSeoDataArgs>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slugByTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slugFirebase?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stagingOnly?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WpStatus'], ParentType, ContextType>;
  statusWp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  techniques?: Resolver<Maybe<Array<ResolversTypes['ArtworkTechnique']>>, ParentType, ContextType>;
  techniquesReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  techniquesSlugs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalExploresAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalLikes?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserWithMetaTimes']>>>, ParentType, ContextType>;
  totalLikesAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRandomLikes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSeensAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updated?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userAccessData?: Resolver<Maybe<ResolversTypes['ProtectedContentUserAccessData']>, ParentType, ContextType>;
  userArtwork?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userCanAccessProtectedContent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanEdit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanOrCantAccessProtectedContentReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userCanView?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userExplored?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userExploredTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userExploredTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userExploredValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userLikedTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userLikedTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userManagesGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSeenTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userSeenTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variants?: Resolver<Maybe<Array<ResolversTypes['ArtworkVariant']>>, ParentType, ContextType>;
  variantsFull?: Resolver<Maybe<Array<ResolversTypes['ArtworkVariant']>>, ParentType, ContextType>;
  walls?: Resolver<Maybe<Array<Maybe<ResolversTypes['Wall']>>>, ParentType, ContextType>;
  wpPostId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  yearStarted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  youtubeVideoId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkCategoriesStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkCategoriesStats'] = ResolversParentTypes['ArtworkCategoriesStats']> = ResolversObject<{
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkCategory'] = ResolversParentTypes['ArtworkCategory']> = ResolversObject<{
  amountArtworks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountArtworksDraft?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentType?: Resolver<ResolversTypes['ArtworkCategoryParentType'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkDimensionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkDimensions'] = ResolversParentTypes['ArtworkDimensions']> = ResolversObject<{
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkFilterValuesColorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkFilterValuesColor'] = ResolversParentTypes['ArtworkFilterValuesColor']> = ResolversObject<{
  hex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkFilterValuesMaterialResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkFilterValuesMaterial'] = ResolversParentTypes['ArtworkFilterValuesMaterial']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkFilterValuesTechniqueResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkFilterValuesTechnique'] = ResolversParentTypes['ArtworkFilterValuesTechnique']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkMaterialResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkMaterial'] = ResolversParentTypes['ArtworkMaterial']> = ResolversObject<{
  amountArtworks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amountArtworksGallery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artworks?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, Partial<ArtworkMaterialArtworksArgs>>;
  created?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WpStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkMaterialOrTechniqueToFixResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkMaterialOrTechniqueToFix'] = ResolversParentTypes['ArtworkMaterialOrTechniqueToFix']> = ResolversObject<{
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slugs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  slugsDetails?: Resolver<Array<ResolversTypes['ArtworkMaterialOrTechniqueToFixSlugsDetails']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkMaterialOrTechniqueToFixSlugsDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkMaterialOrTechniqueToFixSlugsDetails'] = ResolversParentTypes['ArtworkMaterialOrTechniqueToFixSlugsDetails']> = ResolversObject<{
  amountArtworks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wpEditUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkMaterialsOrTechniquesToFixResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkMaterialsOrTechniquesToFix'] = ResolversParentTypes['ArtworkMaterialsOrTechniquesToFix']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  artworkSlugs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  artworks?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, Partial<ArtworkMaterialsOrTechniquesToFixArtworksArgs>>;
  items?: Resolver<Maybe<Array<ResolversTypes['ArtworkMaterialOrTechniqueToFix']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkMaterialsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkMaterialsStats'] = ResolversParentTypes['ArtworkMaterialsStats']> = ResolversObject<{
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkOriginalImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkOriginalImage'] = ResolversParentTypes['ArtworkOriginalImage']> = ResolversObject<{
  aspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  corners?: Resolver<ResolversTypes['SurfaceCornersUser'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkTechniqueResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkTechnique'] = ResolversParentTypes['ArtworkTechnique']> = ResolversObject<{
  amountArtworks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountArtworksGallery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artworks?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, Partial<ArtworkTechniqueArtworksArgs>>;
  created?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WpStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkTechniquesStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkTechniquesStats'] = ResolversParentTypes['ArtworkTechniquesStats']> = ResolversObject<{
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworkVariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworkVariant'] = ResolversParentTypes['ArtworkVariant']> = ResolversObject<{
  dimensionsReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  heightCm?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceCurrency?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  priceEuro?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priceReadableByStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  widthCm?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworksDefaultGalleryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworksDefaultGallery'] = ResolversParentTypes['ArtworksDefaultGallery']> = ResolversObject<{
  galleriesPreviews?: Resolver<Maybe<Array<ResolversTypes['GalleryPreview']>>, ParentType, ContextType>;
  latestAdditions?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworksFilterValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworksFilterValues'] = ResolversParentTypes['ArtworksFilterValues']> = ResolversObject<{
  amountMaterials?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amountTechniques?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  colors?: Resolver<Array<ResolversTypes['ArtworkFilterValuesColor']>, ParentType, ContextType>;
  heightMaxMm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  heightMinMm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  materials?: Resolver<Array<ResolversTypes['ArtworkFilterValuesMaterial']>, ParentType, ContextType>;
  priceMaxEur?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceMinEur?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  techniques?: Resolver<Array<ResolversTypes['ArtworkFilterValuesTechnique']>, ParentType, ContextType>;
  widthMaxMm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  widthMinMm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ArtworksStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtworksStats'] = ResolversParentTypes['ArtworksStats']> = ResolversObject<{
  draft?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  draftIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  listed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  protected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  protectedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  stagingOnly?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stagingOnlyIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  withColors?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  withColorsIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  withoutColors?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  withoutColorsIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthTokenInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthTokenInfo'] = ResolversParentTypes['AuthTokenInfo']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isValid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenInfos?: Resolver<Maybe<ResolversTypes['AuthTokenInfoTokenInfos']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthTokenInfoTokenInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthTokenInfoTokenInfos'] = ResolversParentTypes['AuthTokenInfoTokenInfos']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeAuth?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  timeAuthReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeExpires?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  timeExpiresReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeIssued?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  timeIssuedReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AvailabilityStatiResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailabilityStati'] = ResolversParentTypes['AvailabilityStati']> = ResolversObject<{
  amountTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['AvailabilityStatusSingle']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AvailabilityStatusSingleResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailabilityStatusSingle'] = ResolversParentTypes['AvailabilityStatusSingle']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = ResolversObject<{
  additionalImages?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType>;
  additionalImagesIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesWp?: Resolver<Maybe<Array<ResolversTypes['ImageWp']>>, ParentType, ContextType>;
  codesRelated?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<BlogContentArgs>>;
  created?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  createdReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdReadableWeb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featuredImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  featuredImageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageWp?: Resolver<Maybe<ResolversTypes['ImageWp']>, ParentType, ContextType>;
  galleriesBasics?: Resolver<Maybe<Array<ResolversTypes['GalleryBasic']>>, ParentType, ContextType>;
  galleriesCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  hasAdditionalImages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  langForResolvers?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  links?: Resolver<Maybe<Array<ResolversTypes['BlogLink']>>, ParentType, ContextType>;
  pathWeb?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relatedBlogSlugs?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  relatedBlogs?: Resolver<Maybe<Array<ResolversTypes['Blog']>>, ParentType, ContextType>;
  seoData?: Resolver<Maybe<ResolversTypes['WebSeoData']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slugInLang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slugs?: Resolver<ResolversTypes['SlugsInLangs'], ParentType, ContextType>;
  sources?: Resolver<Maybe<Array<ResolversTypes['BlogLink']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WpStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userLikedTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userLikedTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSeenTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userSeenTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogLink'] = ResolversParentTypes['BlogLink']> = ResolversObject<{
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BranchLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchLink'] = ResolversParentTypes['BranchLink']> = ResolversObject<{
  appLinkUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  branchShareLinkKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentFound?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  debug?: Resolver<Maybe<ResolversTypes['BranchLinkDebugData']>, ParentType, ContextType>;
  matchId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qrData?: Resolver<Maybe<ResolversTypes['BranchLinkQrData']>, ParentType, ContextType>;
  qrImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seoData?: Resolver<Maybe<ResolversTypes['BranchLinkSeoData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BranchLinkDebugDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchLinkDebugData'] = ResolversParentTypes['BranchLinkDebugData']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  branchKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  branchTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  branchUrlInfosDataString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cacheGroup?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cacheGroupHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  galleryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gallerySlug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rescrapeUrlFacebookResultString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updateQrCodeResultString?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BranchLinkQrDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchLinkQrData'] = ResolversParentTypes['BranchLinkQrData']> = ResolversObject<{
  filename?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  targetUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BranchLinkSeoDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchLinkSeoData'] = ResolversParentTypes['BranchLinkSeoData']> = ResolversObject<{
  ogDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ogImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ogTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BranchUrlInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchUrlInfos'] = ResolversParentTypes['BranchUrlInfos']> = ResolversObject<{
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dataString?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isNew?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  links?: Resolver<Maybe<Array<ResolversTypes['Link']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentType?: Resolver<Maybe<ResolversTypes['ContactParentType']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Countries'] = ResolversParentTypes['Countries']> = ResolversObject<{
  amountTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['CountrySingle']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountrySingleResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountrySingle'] = ResolversParentTypes['CountrySingle']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrencyConvertedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencyConverted'] = ResolversParentTypes['CurrencyConverted']> = ResolversObject<{
  currencyKey?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  decimalScale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['CurrencyConvertedValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrencyConvertedValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencyConvertedValue'] = ResolversParentTypes['CurrencyConvertedValue']> = ResolversObject<{
  exact?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rounded?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  string?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DateStartEndPartsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DateStartEndParts'] = ResolversParentTypes['DateStartEndParts']> = ResolversObject<{
  endR?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parts?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  startR?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DbObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DbObjectId'], any> {
  name: 'DbObjectId';
}

export type DebugValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['DebugValue'] = ResolversParentTypes['DebugValue']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  additionalImages?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType, Partial<EventAdditionalImagesArgs>>;
  additionalImagesIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  additionalImagesThumbUrls?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesUrls?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesWp?: Resolver<Maybe<Array<ResolversTypes['ImageWp']>>, ParentType, ContextType>;
  artists?: Resolver<Maybe<Array<ResolversTypes['Artist']>>, ParentType, ContextType>;
  artistsIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  artistsTitles?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  categoriesReadable?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<EventContentArgs>>;
  contentNew?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentsHtml?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  contentsMd?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  createdById?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdReadableShort?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateEnd?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  dateEndCalendar?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  dateEndCalendarReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateEndReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateStart?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  dateStartEndParts?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, Partial<EventDateStartEndPartsArgs>>;
  dateStartReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  era?: Resolver<ResolversTypes['EventEra'], ParentType, ContextType>;
  eraIsFuture?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  eraIsPast?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  eraIsPresent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  externalOrganizer?: Resolver<Maybe<ResolversTypes['ExternalOrganizer']>, ParentType, ContextType>;
  featuredImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, Partial<EventFeaturedImageArgs>>;
  featuredImageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageWp?: Resolver<Maybe<ResolversTypes['ImageWp']>, ParentType, ContextType>;
  galleriesBasics?: Resolver<Maybe<Array<ResolversTypes['GalleryBasic']>>, ParentType, ContextType>;
  galleriesCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  galleriesOvr?: Resolver<Maybe<Array<ResolversTypes['Gallery']>>, ParentType, ContextType>;
  galleriesProtectedCodes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  hasAdditionalImages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inListedGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  inProtectedGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCourse?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType>;
  locationReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locationSearch?: Resolver<Maybe<ResolversTypes['LocationSearch']>, ParentType, ContextType>;
  openingHours?: Resolver<Maybe<Array<ResolversTypes['OpeningHoursEntry']>>, ParentType, ContextType>;
  openingHoursLines?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, Partial<EventOpeningHoursLinesArgs>>;
  republished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  seoData?: Resolver<Maybe<ResolversTypes['WebSeoData']>, ParentType, ContextType, Partial<EventSeoDataArgs>>;
  showLocationInListItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showOpeningHours?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stagingOnly?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WpStatus'], ParentType, ContextType>;
  timeRangeReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeRanges?: Resolver<Array<ResolversTypes['EventFilterTimeRange']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userAccessData?: Resolver<Maybe<ResolversTypes['ProtectedContentUserAccessData']>, ParentType, ContextType>;
  userCanAccessProtectedContent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanOrCantAccessProtectedContentReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userLikedTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userLikedTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userManagesGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userSeenTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userSeenTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wpPostId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventCategoriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventCategories'] = ResolversParentTypes['EventCategories']> = ResolversObject<{
  amountTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['EventCategory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventCategory'] = ResolversParentTypes['EventCategory']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventFilterValueCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventFilterValueCategory'] = ResolversParentTypes['EventFilterValueCategory']> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventFilterValueCityEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventFilterValueCityEntry'] = ResolversParentTypes['EventFilterValueCityEntry']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventFilterValueTimeRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventFilterValueTimeRange'] = ResolversParentTypes['EventFilterValueTimeRange']> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['EventFilterTimeRange'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventsFilterValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventsFilterValues'] = ResolversParentTypes['EventsFilterValues']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['EventFilterValueCategory']>, ParentType, ContextType>;
  cities?: Resolver<Array<ResolversTypes['EventFilterValueCityEntry']>, ParentType, ContextType>;
  timeRanges?: Resolver<Array<ResolversTypes['EventFilterValueTimeRange']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventsStats'] = ResolversParentTypes['EventsStats']> = ResolversObject<{
  listed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  protected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  protectedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  stagingOnly?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stagingOnlyIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExternalOrganizerResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalOrganizer'] = ResolversParentTypes['ExternalOrganizer']> = ResolversObject<{
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  imageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageWp?: Resolver<Maybe<ResolversTypes['ImageWp']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleriesStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleriesStats'] = ResolversParentTypes['GalleriesStats']> = ResolversObject<{
  listed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  protected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  protectedIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  stagingOnly?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stagingOnlyIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  withoutArtists?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  withoutArtworks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Gallery'] = ResolversParentTypes['Gallery']> = ResolversObject<{
  additionalImages?: Resolver<Maybe<Array<ResolversTypes['Image']>>, ParentType, ContextType, Partial<GalleryAdditionalImagesArgs>>;
  additionalImagesIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  additionalImagesWp?: Resolver<Maybe<Array<ResolversTypes['ImageWp']>>, ParentType, ContextType>;
  amountArtists?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountArtworks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountArtworksDraft?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountEvents?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountFollowers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<GalleryAmountFollowersArgs>>;
  amountPublicWalls?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artists?: Resolver<Maybe<Array<ResolversTypes['Artist']>>, ParentType, ContextType, Partial<GalleryArtistsArgs>>;
  artworkCategories?: Resolver<Maybe<Array<ResolversTypes['ArtworkCategory']>>, ParentType, ContextType, Partial<GalleryArtworkCategoriesArgs>>;
  artworkCategoriesSlugs?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  artworkMaterials?: Resolver<Maybe<Array<ResolversTypes['ArtworkMaterial']>>, ParentType, ContextType>;
  artworkTechniques?: Resolver<Maybe<Array<ResolversTypes['ArtworkTechnique']>>, ParentType, ContextType>;
  artworks?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, Partial<GalleryArtworksArgs>>;
  artworksFilterValues?: Resolver<Maybe<ResolversTypes['ArtworksFilterValues']>, ParentType, ContextType>;
  artworksIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  billing?: Resolver<Maybe<ResolversTypes['GalleryBilling']>, ParentType, ContextType>;
  brandingInfos?: Resolver<Maybe<ResolversTypes['GalleryBrandingInfos']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codesAutoAdd?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<GalleryContentArgs>>;
  contentsHtml?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  contentsMd?: Resolver<ResolversTypes['StringInLangs'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  createdReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultCurrency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  defaultGallery?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dontSendPushes?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dontShowArtworkPrices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  embedEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  enableShareToInstagram?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType, Partial<GalleryEventsArgs>>;
  everybodyCanCreatePublicWalls?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  featuredImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, Partial<GalleryFeaturedImageArgs>>;
  featuredImageThumbRectUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featuredImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<GalleryFeaturedImageUrlArgs>>;
  featuredImageWp?: Resolver<Maybe<ResolversTypes['ImageWp']>, ParentType, ContextType>;
  firstLocation?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, Partial<GalleryFirstLocationArgs>>;
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserWithMetaTimesAndTicks']>>>, ParentType, ContextType, Partial<GalleryFollowersArgs>>;
  galleryPackage?: Resolver<Maybe<ResolversTypes['GalleryPackage']>, ParentType, ContextType>;
  galleryPackageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['GalleryGender'], ParentType, ContextType>;
  hasAdditionalImages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasArtworksWithMissingCategories?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hideExactAddress?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  homeTabsFirstTabLabelOverride?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastArtistCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastArtistCreatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastArtworkCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastArtworkCreatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastEventCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastEventCreatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdateCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastUpdateCreatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  launchImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  launchLogoImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  listedArtistsSlugs?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<ResolversTypes['Location']>>, ParentType, ContextType, Partial<GalleryLocationsArgs>>;
  managerEmails?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  managerUids?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  newestArtwork?: Resolver<Maybe<ResolversTypes['Artwork']>, ParentType, ContextType, Partial<GalleryNewestArtworkArgs>>;
  newestPublicWall?: Resolver<Maybe<ResolversTypes['Wall']>, ParentType, ContextType>;
  preferrabilityFactor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  protected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  publicSurfaces?: Resolver<Maybe<Array<ResolversTypes['Surface']>>, ParentType, ContextType>;
  publicWalls?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType, Partial<GalleryPublicWallsArgs>>;
  qrCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoData?: Resolver<ResolversTypes['WebSeoData'], ParentType, ContextType>;
  showEventsTab?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shownInOvr?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  singleArtist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  singleArtistGender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  singleArtistSlug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stagingOnly?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['WpStatus'], ParentType, ContextType>;
  tabBarLabels?: Resolver<Maybe<Array<ResolversTypes['GalleryTabBarLabel']>>, ParentType, ContextType>;
  tabBarLabelsAllLangs?: Resolver<ResolversTypes['TabBarLabelsInLangs'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  useTabBarLabels?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userAccessData?: Resolver<Maybe<ResolversTypes['ProtectedContentUserAccessData']>, ParentType, ContextType>;
  userCanAccessProtectedContent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanOrCantAccessProtectedContentReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userFavoritedGallery?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userFavoritedGalleryReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userFirstFollowedGallery?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userFirstFollowedGalleryReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userFollowsGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userGalleryTicks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userLastVisitedGallery?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userLastVisitedGalleryReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userManagesGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userManagesGalleryProtection?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  webLogoImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wpPostId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalytics'] = ResolversParentTypes['GalleryAnalytics']> = ResolversObject<{
  artworks?: Resolver<Maybe<ResolversTypes['GalleryAnalyticsPublicationsValue']>, ParentType, ContextType, Partial<GalleryAnalyticsArtworksArgs>>;
  events?: Resolver<Maybe<ResolversTypes['GalleryAnalyticsPublicationsValue']>, ParentType, ContextType, Partial<GalleryAnalyticsEventsArgs>>;
  followers?: Resolver<Maybe<ResolversTypes['GalleryAnalyticsFollowersValue']>, ParentType, ContextType, Partial<GalleryAnalyticsFollowersArgs>>;
  publications?: Resolver<Maybe<ResolversTypes['GalleryAnalyticsPublicationsValue']>, ParentType, ContextType, Partial<GalleryAnalyticsPublicationsArgs>>;
  userCanOrCantViewReason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userCanView?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsFollowersResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsFollowers'] = ResolversParentTypes['GalleryAnalyticsFollowers']> = ResolversObject<{
  push?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  registered?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsFollowersSingleResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsFollowersSingle'] = ResolversParentTypes['GalleryAnalyticsFollowersSingle']> = ResolversObject<{
  range?: Resolver<ResolversTypes['GalleryAnalyticsRangeValues'], ParentType, ContextType>;
  values?: Resolver<ResolversTypes['GalleryAnalyticsFollowers'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsFollowersValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsFollowersValue'] = ResolversParentTypes['GalleryAnalyticsFollowersValue']> = ResolversObject<{
  before?: Resolver<ResolversTypes['GalleryAnalyticsFollowersSingle'], ParentType, ContextType>;
  rangeAbs?: Resolver<Array<ResolversTypes['GalleryAnalyticsFollowersSingle']>, ParentType, ContextType>;
  rangeRel?: Resolver<Array<ResolversTypes['GalleryAnalyticsFollowersSingle']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsPublicationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsPublications'] = ResolversParentTypes['GalleryAnalyticsPublications']> = ResolversObject<{
  published?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsPublicationsSingleResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsPublicationsSingle'] = ResolversParentTypes['GalleryAnalyticsPublicationsSingle']> = ResolversObject<{
  range?: Resolver<ResolversTypes['GalleryAnalyticsRangeValues'], ParentType, ContextType>;
  values?: Resolver<ResolversTypes['GalleryAnalyticsPublications'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsPublicationsValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsPublicationsValue'] = ResolversParentTypes['GalleryAnalyticsPublicationsValue']> = ResolversObject<{
  before?: Resolver<ResolversTypes['GalleryAnalyticsPublicationsSingle'], ParentType, ContextType>;
  rangeAbs?: Resolver<Array<ResolversTypes['GalleryAnalyticsPublicationsSingle']>, ParentType, ContextType>;
  rangeRel?: Resolver<Array<ResolversTypes['GalleryAnalyticsPublicationsSingle']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsRangeValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsRangeValues'] = ResolversParentTypes['GalleryAnalyticsRangeValues']> = ResolversObject<{
  end?: Resolver<ResolversTypes['GalleryAnalyticsRangeValuesStartEnd'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['GalleryAnalyticsRangeValuesLabel'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['GalleryAnalyticsRangeValuesStartEnd'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsRangeValuesLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsRangeValuesLabel'] = ResolversParentTypes['GalleryAnalyticsRangeValuesLabel']> = ResolversObject<{
  full?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  short?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryAnalyticsRangeValuesStartEndResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryAnalyticsRangeValuesStartEnd'] = ResolversParentTypes['GalleryAnalyticsRangeValuesStartEnd']> = ResolversObject<{
  dayString?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ms?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  readable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryBasicResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryBasic'] = ResolversParentTypes['GalleryBasic']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryBillingResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryBilling'] = ResolversParentTypes['GalleryBilling']> = ResolversObject<{
  contracts?: Resolver<ResolversTypes['GalleryBillingContracts'], ParentType, ContextType>;
  oneTimeCharges?: Resolver<Maybe<Array<ResolversTypes['GalleryOneTimeCharge']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryBillingContractNetGainResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryBillingContractNetGain'] = ResolversParentTypes['GalleryBillingContractNetGain']> = ResolversObject<{
  parts?: Resolver<Array<ResolversTypes['GalleryBillingContractNetGainPart']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryBillingContractNetGainPartResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryBillingContractNetGainPart'] = ResolversParentTypes['GalleryBillingContractNetGainPart']> = ResolversObject<{
  costsMonth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  costsTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  months?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryBillingContractsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryBillingContracts'] = ResolversParentTypes['GalleryBillingContracts']> = ResolversObject<{
  cancellationYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  firstRenewal?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  firstRenewalReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  netGains?: Resolver<Maybe<Array<ResolversTypes['GalleryBillingContractNetGain']>>, ParentType, ContextType>;
  nextRenewal?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  nextRenewalCosts?: Resolver<Maybe<ResolversTypes['GalleryBillingContractsNextRenewalCosts']>, ParentType, ContextType>;
  nextRenewalReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  startReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryBillingContractsNextRenewalCostsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryBillingContractsNextRenewalCosts'] = ResolversParentTypes['GalleryBillingContractsNextRenewalCosts']> = ResolversObject<{
  costsYear?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryBrandingInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryBrandingInfos'] = ResolversParentTypes['GalleryBrandingInfos']> = ResolversObject<{
  colorPrimary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  colorTextOnPrimary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  launchScreenLogoType?: Resolver<Maybe<ResolversTypes['GalleryBrandingInfosLaunchScreenLogoType']>, ParentType, ContextType>;
  statusBarStyle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryManagedWithFollowersResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryManagedWithFollowers'] = ResolversParentTypes['GalleryManagedWithFollowers']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followersPush?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followersRegistered?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followersTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryOneTimeChargeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryOneTimeCharge'] = ResolversParentTypes['GalleryOneTimeCharge']> = ResolversObject<{
  categories?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  customCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  internalCosts?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  invoiceDate?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  invoiceDateReadable?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invoicedAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  netGain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryPackageResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryPackage'] = ResolversParentTypes['GalleryPackage']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['GalleryPackageType'], ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryPreviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryPreview'] = ResolversParentTypes['GalleryPreview']> = ResolversObject<{
  artworks?: Resolver<Array<ResolversTypes['Artwork']>, ParentType, ContextType, Partial<GalleryPreviewArtworksArgs>>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featuredImageThumbUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastArtworkCreated?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  lastArtworkCreatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  newestArtworkCreated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryProtectionDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryProtectionData'] = ResolversParentTypes['GalleryProtectionData']> = ResolversObject<{
  emailRules?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryProtectionDataEmailRule']>>>, ParentType, ContextType>;
  enableShareToInstagram?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  passwords?: Resolver<Maybe<Array<Maybe<ResolversTypes['GalleryProtectionDataPassword']>>>, ParentType, ContextType>;
  protected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanEdit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryProtectionDataEmailRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryProtectionDataEmailRule'] = ResolversParentTypes['GalleryProtectionDataEmailRule']> = ResolversObject<{
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rule?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryProtectionDataPasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryProtectionDataPassword'] = ResolversParentTypes['GalleryProtectionDataPassword']> = ResolversObject<{
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GalleryTabBarLabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['GalleryTabBarLabel'] = ResolversParentTypes['GalleryTabBarLabel']> = ResolversObject<{
  tabKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tabLabel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GeoCoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoCoordinates'] = ResolversParentTypes['GeoCoordinates']> = ResolversObject<{
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GooglePlaceByIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['GooglePlaceById'] = ResolversParentTypes['GooglePlaceById']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryReadableEn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  formattedAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['LocationLatLng'], ParentType, ContextType>;
  shortFormattedAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stateShort?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streetNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GooglePlacesBySearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['GooglePlacesBySearch'] = ResolversParentTypes['GooglePlacesBySearch']> = ResolversObject<{
  results?: Resolver<Array<ResolversTypes['GooglePlacesBySearchResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GooglePlacesBySearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GooglePlacesBySearchResult'] = ResolversParentTypes['GooglePlacesBySearchResult']> = ResolversObject<{
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = ResolversObject<{
  extension?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isDraft?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originUploadPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType, RequireFields<ImageSizeArgs, 'size'>>;
  sizes?: Resolver<Maybe<Array<ResolversTypes['ImageSize']>>, ParentType, ContextType, Partial<ImageSizesArgs>>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  urlFull?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  urlThumb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wpPostId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageSingleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageSingle'] = ResolversParentTypes['ImageSingle']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageSizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageSize'] = ResolversParentTypes['ImageSize']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['ImageSizeSize'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageWpResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageWp'] = ResolversParentTypes['ImageWp']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isDraft?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sizes?: Resolver<Maybe<ResolversTypes['ImageWpSizes']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ImageWpSizesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageWpSizes'] = ResolversParentTypes['ImageWpSizes']> = ResolversObject<{
  FBSHARE?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  c300?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  c500?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  c1000?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  c1500?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  c2000?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  u300?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  u500?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  u1000?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  u1500?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  u2000?: Resolver<Maybe<ResolversTypes['ImageSize']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = ResolversObject<{
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LinkType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addressReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  areaCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coords?: Resolver<Maybe<ResolversTypes['GeoCoordinates']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<LocationCountryArgs>>;
  countryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<LocationCountryCodeArgs>>;
  googleMapsShareSuffix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  googleMapsShareUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  googleMapsUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  googlePlaceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LocationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationLatLngResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationLatLng'] = ResolversParentTypes['LocationLatLng']> = ResolversObject<{
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationSearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationSearch'] = ResolversParentTypes['LocationSearch']> = ResolversObject<{
  addressSearch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addAnalyticsEvent?: Resolver<ResolversTypes['ResMAddAnalyticsEvent'], ParentType, ContextType, RequireFields<MutationAddAnalyticsEventArgs, 'origin' | 'type' | 'typeKey'>>;
  addUserConversationMessage?: Resolver<ResolversTypes['ResMAddUserConversationMessage'], ParentType, ContextType, RequireFields<MutationAddUserConversationMessageArgs, 'conversationId' | 'messageText' | 'originSlugOrId' | 'originType'>>;
  addUserGalleryCode?: Resolver<ResolversTypes['ResMAddUserGalleryCode'], ParentType, ContextType, RequireFields<MutationAddUserGalleryCodeArgs, 'clientId' | 'code' | 'platform'>>;
  addUserGalleryTick?: Resolver<ResolversTypes['ResMAddUserGalleryTick'], ParentType, ContextType, RequireFields<MutationAddUserGalleryTickArgs, 'clientId' | 'code' | 'platform'>>;
  cleanUser?: Resolver<ResolversTypes['ResMCleanUser'], ParentType, ContextType, Partial<MutationCleanUserArgs>>;
  cleanUserConversations?: Resolver<ResolversTypes['ResMCleanUserConversations'], ParentType, ContextType, Partial<MutationCleanUserConversationsArgs>>;
  cleanUserFollowedGalleries?: Resolver<ResolversTypes['ResMCleanUserFollowedGalleries'], ParentType, ContextType, Partial<MutationCleanUserFollowedGalleriesArgs>>;
  cleanUserNotifications?: Resolver<ResolversTypes['ResMCleanUserNotifications'], ParentType, ContextType, Partial<MutationCleanUserNotificationsArgs>>;
  cleanUserSurfaces?: Resolver<ResolversTypes['ResMCleanUserSurfaces'], ParentType, ContextType, Partial<MutationCleanUserSurfacesArgs>>;
  deleteArtwork?: Resolver<ResolversTypes['ResMDeleteArtwork'], ParentType, ContextType, RequireFields<MutationDeleteArtworkArgs, 'slug'>>;
  deleteSurface?: Resolver<ResolversTypes['ResMDeleteSurface'], ParentType, ContextType, RequireFields<MutationDeleteSurfaceArgs, 'id'>>;
  deleteUserAccount?: Resolver<ResolversTypes['ResMDeleteUserAccount'], ParentType, ContextType, Partial<MutationDeleteUserAccountArgs>>;
  deleteWall?: Resolver<ResolversTypes['ResMDeleteWall'], ParentType, ContextType, RequireFields<MutationDeleteWallArgs, 'artworkSlug' | 'surfaceId'>>;
  mergeUsersFollowedGalleries?: Resolver<ResolversTypes['ResMMergeUsersFollowedGalleries'], ParentType, ContextType, RequireFields<MutationMergeUsersFollowedGalleriesArgs, 'uid1' | 'uid2'>>;
  removeUserGalleryCode?: Resolver<ResolversTypes['ResMRemoveUserGalleryCode'], ParentType, ContextType, RequireFields<MutationRemoveUserGalleryCodeArgs, 'clientId' | 'code' | 'platform'>>;
  reportChatAbuse?: Resolver<ResolversTypes['ResMReportChatAbuse'], ParentType, ContextType, RequireFields<MutationReportChatAbuseArgs, 'code' | 'conversationId' | 'reportedUserUid'>>;
  setAllUserNotificationsSeen?: Resolver<ResolversTypes['ResMCleanUserNotifications'], ParentType, ContextType, Partial<MutationSetAllUserNotificationsSeenArgs>>;
  setDebugValue?: Resolver<ResolversTypes['ResMSetDebugValue'], ParentType, ContextType, RequireFields<MutationSetDebugValueArgs, 'key'>>;
  setGalleryProtectionData?: Resolver<ResolversTypes['ResMSetGalleryProtectionData'], ParentType, ContextType, RequireFields<MutationSetGalleryProtectionDataArgs, 'code' | 'inputEmailRules' | 'inputPasswords'>>;
  setSurfaceTags?: Resolver<ResolversTypes['ResMSetSurfaceTags'], ParentType, ContextType, RequireFields<MutationSetSurfaceTagsArgs, 'id' | 'tags'>>;
  setUserArtistLiked?: Resolver<ResolversTypes['ResMSetUserArtistLiked'], ParentType, ContextType, RequireFields<MutationSetUserArtistLikedArgs, 'liked' | 'slug'>>;
  setUserArtistSeen?: Resolver<ResolversTypes['ResMSetUserArtistSeen'], ParentType, ContextType, RequireFields<MutationSetUserArtistSeenArgs, 'slug'>>;
  setUserArtworkData?: Resolver<ResolversTypes['ResMSetUserArtworkData'], ParentType, ContextType, RequireFields<MutationSetUserArtworkDataArgs, 'artworkSlug' | 'code' | 'dataJson'>>;
  setUserArtworkLiked?: Resolver<ResolversTypes['ResMSetUserArtworkLiked'], ParentType, ContextType, RequireFields<MutationSetUserArtworkLikedArgs, 'liked' | 'slug'>>;
  setUserArtworkSeen?: Resolver<ResolversTypes['ResMSetUserArtworkSeen'], ParentType, ContextType, RequireFields<MutationSetUserArtworkSeenArgs, 'slug'>>;
  setUserArtworksExploreStati?: Resolver<ResolversTypes['ResMSetUserArtworksExploreStati'], ParentType, ContextType, RequireFields<MutationSetUserArtworksExploreStatiArgs, 'exploredStati'>>;
  setUserBlogLiked?: Resolver<ResolversTypes['ResMSetUserBlogLiked'], ParentType, ContextType, RequireFields<MutationSetUserBlogLikedArgs, 'liked' | 'slug'>>;
  setUserBlogSeen?: Resolver<ResolversTypes['ResMSetUserBlogSeen'], ParentType, ContextType, RequireFields<MutationSetUserBlogSeenArgs, 'slug'>>;
  setUserEventLiked?: Resolver<ResolversTypes['ResMSetUserEventLiked'], ParentType, ContextType, RequireFields<MutationSetUserEventLikedArgs, 'liked' | 'slug'>>;
  setUserEventSeen?: Resolver<ResolversTypes['ResMSetUserEventSeen'], ParentType, ContextType, RequireFields<MutationSetUserEventSeenArgs, 'slug'>>;
  setUserGalleryFavorited?: Resolver<ResolversTypes['ResMSetUserGalleryFavorited'], ParentType, ContextType, RequireFields<MutationSetUserGalleryFavoritedArgs, 'code' | 'favorited'>>;
  setUserGalleryPassword?: Resolver<ResolversTypes['ResMSetUserGalleryPassword'], ParentType, ContextType, RequireFields<MutationSetUserGalleryPasswordArgs, 'code'>>;
  setUserOwnSettings?: Resolver<ResolversTypes['ResMSetUserOwnSettings'], ParentType, ContextType, RequireFields<MutationSetUserOwnSettingsArgs, 'input'>>;
  setUserSurfaceData?: Resolver<ResolversTypes['ResMSetUserSurfaceData'], ParentType, ContextType, RequireFields<MutationSetUserSurfaceDataArgs, 'surfaceId' | 'valuesJson'>>;
  setUserWallData?: Resolver<ResolversTypes['ResMSetUserWallData'], ParentType, ContextType, RequireFields<MutationSetUserWallDataArgs, 'artworkSlug' | 'surfaceId' | 'valuesJson'>>;
  setUserWallLiked?: Resolver<ResolversTypes['ResMSetUserWallLiked'], ParentType, ContextType, RequireFields<MutationSetUserWallLikedArgs, 'id' | 'liked'>>;
}>;

export type OpeningHoursEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpeningHoursEntry'] = ResolversParentTypes['OpeningHoursEntry']> = ResolversObject<{
  dateFrom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeRange?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weekdayFrom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weekdayTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileInfos'] = ResolversParentTypes['ProfileInfos']> = ResolversObject<{
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idOrSlug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typeExtras?: Resolver<Maybe<ResolversTypes['ProfileInfosTypeExtras']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileInfosTypeExtrasResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileInfosTypeExtras'] = ResolversParentTypes['ProfileInfosTypeExtras']> = ResolversObject<{
  galleryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProtectedContentUserAccessDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProtectedContentUserAccessData'] = ResolversParentTypes['ProtectedContentUserAccessData']> = ResolversObject<{
  canAccess?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canViewDrafts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  analyticsEvents?: Resolver<Array<ResolversTypes['AnalyticsEvent']>, ParentType, ContextType, RequireFields<QueryAnalyticsEventsArgs, 'filter'>>;
  artistBySlug?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryArtistBySlugArgs, 'slug'>>;
  artists?: Resolver<Maybe<Array<ResolversTypes['Artist']>>, ParentType, ContextType, Partial<QueryArtistsArgs>>;
  artworkBySlug?: Resolver<Maybe<ResolversTypes['Artwork']>, ParentType, ContextType, RequireFields<QueryArtworkBySlugArgs, 'slug'>>;
  artworkCategories?: Resolver<Maybe<Array<ResolversTypes['ArtworkCategory']>>, ParentType, ContextType, Partial<QueryArtworkCategoriesArgs>>;
  artworkMaterials?: Resolver<Maybe<Array<ResolversTypes['ArtworkMaterial']>>, ParentType, ContextType, Partial<QueryArtworkMaterialsArgs>>;
  artworkMaterialsToFix?: Resolver<ResolversTypes['ArtworkMaterialsOrTechniquesToFix'], ParentType, ContextType>;
  artworkTechniques?: Resolver<Maybe<Array<ResolversTypes['ArtworkTechnique']>>, ParentType, ContextType, Partial<QueryArtworkTechniquesArgs>>;
  artworkTechniquesToFix?: Resolver<ResolversTypes['ArtworkMaterialsOrTechniquesToFix'], ParentType, ContextType>;
  artworks?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, Partial<QueryArtworksArgs>>;
  artworksByMaterial?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, RequireFields<QueryArtworksByMaterialArgs, 'materialSlugEn'>>;
  artworksByTechnique?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, RequireFields<QueryArtworksByTechniqueArgs, 'techniqueSlugEn'>>;
  artworksDefaultGallery?: Resolver<ResolversTypes['ArtworksDefaultGallery'], ParentType, ContextType, RequireFields<QueryArtworksDefaultGalleryArgs, 'limitGalleryPreviewArtworks' | 'limitLatestAdditions'>>;
  authTokenInfo?: Resolver<ResolversTypes['AuthTokenInfo'], ParentType, ContextType, Partial<QueryAuthTokenInfoArgs>>;
  availabilityStati?: Resolver<ResolversTypes['AvailabilityStati'], ParentType, ContextType, Partial<QueryAvailabilityStatiArgs>>;
  blogBySlug?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<QueryBlogBySlugArgs, 'slug'>>;
  blogs?: Resolver<Maybe<Array<ResolversTypes['Blog']>>, ParentType, ContextType, Partial<QueryBlogsArgs>>;
  blogsLiked?: Resolver<Array<ResolversTypes['Blog']>, ParentType, ContextType, Partial<QueryBlogsLikedArgs>>;
  branchLink?: Resolver<Maybe<ResolversTypes['BranchLink']>, ParentType, ContextType, RequireFields<QueryBranchLinkArgs, 'identifier' | 'type'>>;
  branchUrlInfos?: Resolver<ResolversTypes['BranchUrlInfos'], ParentType, ContextType, Partial<QueryBranchUrlInfosArgs>>;
  countries?: Resolver<ResolversTypes['Countries'], ParentType, ContextType, Partial<QueryCountriesArgs>>;
  currencyConverted?: Resolver<ResolversTypes['CurrencyConverted'], ParentType, ContextType, RequireFields<QueryCurrencyConvertedArgs, 'inputCurrency' | 'inputValues' | 'outputCurrency' | 'priceIsExact'>>;
  dateStartEndParts?: Resolver<ResolversTypes['DateStartEndParts'], ParentType, ContextType, RequireFields<QueryDateStartEndPartsArgs, 'lang' | 'startMs'>>;
  debugValue?: Resolver<ResolversTypes['DebugValue'], ParentType, ContextType, RequireFields<QueryDebugValueArgs, 'key'>>;
  eventBySlug?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventBySlugArgs, 'slug'>>;
  eventCategories?: Resolver<ResolversTypes['EventCategories'], ParentType, ContextType, Partial<QueryEventCategoriesArgs>>;
  events?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType, Partial<QueryEventsArgs>>;
  eventsBySlugs?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType, RequireFields<QueryEventsBySlugsArgs, 'slugs'>>;
  eventsFilterValues?: Resolver<ResolversTypes['EventsFilterValues'], ParentType, ContextType, RequireFields<QueryEventsFilterValuesArgs, 'galleryCode'>>;
  eventsLiked?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryEventsLikedArgs>>;
  galleries?: Resolver<Maybe<Array<ResolversTypes['Gallery']>>, ParentType, ContextType, Partial<QueryGalleriesArgs>>;
  galleriesBasic?: Resolver<Array<ResolversTypes['Gallery']>, ParentType, ContextType>;
  galleriesManagedByEmailBasics?: Resolver<Maybe<Array<ResolversTypes['GalleryBasic']>>, ParentType, ContextType, RequireFields<QueryGalleriesManagedByEmailBasicsArgs, 'email'>>;
  galleriesManagedFollowers?: Resolver<Maybe<Array<ResolversTypes['GalleryManagedWithFollowers']>>, ParentType, ContextType>;
  galleriesOvr?: Resolver<Array<ResolversTypes['Gallery']>, ParentType, ContextType, Partial<QueryGalleriesOvrArgs>>;
  galleryAnalytics?: Resolver<Maybe<ResolversTypes['GalleryAnalytics']>, ParentType, ContextType, RequireFields<QueryGalleryAnalyticsArgs, 'code'>>;
  galleryByCode?: Resolver<Maybe<ResolversTypes['Gallery']>, ParentType, ContextType, RequireFields<QueryGalleryByCodeArgs, 'code'>>;
  galleryBySlug?: Resolver<Maybe<ResolversTypes['Gallery']>, ParentType, ContextType, RequireFields<QueryGalleryBySlugArgs, 'slug'>>;
  galleryProtectionData?: Resolver<Maybe<ResolversTypes['GalleryProtectionData']>, ParentType, ContextType, RequireFields<QueryGalleryProtectionDataArgs, 'code'>>;
  googlePlaceById?: Resolver<Maybe<ResolversTypes['GooglePlaceById']>, ParentType, ContextType, RequireFields<QueryGooglePlaceByIdArgs, 'lang' | 'placeId'>>;
  googlePlacesBySearch?: Resolver<ResolversTypes['GooglePlacesBySearch'], ParentType, ContextType, RequireFields<QueryGooglePlacesBySearchArgs, 'lang' | 'search'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryMeArgs>>;
  profileInfos?: Resolver<Maybe<ResolversTypes['ProfileInfos']>, ParentType, ContextType, RequireFields<QueryProfileInfosArgs, 'idOrSlug' | 'type'>>;
  profileInfosMulti?: Resolver<Maybe<Array<ResolversTypes['ProfileInfos']>>, ParentType, ContextType, RequireFields<QueryProfileInfosMultiArgs, 'entries'>>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  streamItems?: Resolver<ResolversTypes['StreamItems'], ParentType, ContextType, RequireFields<QueryStreamItemsArgs, 'code'>>;
  streamItemsFilterValues?: Resolver<ResolversTypes['StreamItemsFilterValues'], ParentType, ContextType, RequireFields<QueryStreamItemsFilterValuesArgs, 'code'>>;
  surfaces?: Resolver<Maybe<Array<ResolversTypes['Surface']>>, ParentType, ContextType, Partial<QuerySurfacesArgs>>;
  surfacesAdmins?: Resolver<ResolversTypes['SurfacesAdmins'], ParentType, ContextType, Partial<QuerySurfacesAdminsArgs>>;
  surfacesNotOnWalls?: Resolver<Maybe<Array<ResolversTypes['Surface']>>, ParentType, ContextType, Partial<QuerySurfacesNotOnWallsArgs>>;
  wallInfos?: Resolver<Maybe<ResolversTypes['WallInfos']>, ParentType, ContextType, RequireFields<QueryWallInfosArgs, 'artworkSlug' | 'surfaceId'>>;
  walls?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType, Partial<QueryWallsArgs>>;
  wallsByArtworkSlug?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType, RequireFields<QueryWallsByArtworkSlugArgs, 'artworkSlug' | 'queryMode'>>;
  wallsByIdFirebase?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType, RequireFields<QueryWallsByIdFirebaseArgs, 'idFirebase'>>;
  wallsByIdsGeneric?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType, RequireFields<QueryWallsByIdsGenericArgs, 'idsGeneric'>>;
  wallsLiked?: Resolver<Array<ResolversTypes['Wall']>, ParentType, ContextType, Partial<QueryWallsLikedArgs>>;
}>;

export type ResMAddAnalyticsEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMAddAnalyticsEvent'] = ResolversParentTypes['ResMAddAnalyticsEvent']> = ResolversObject<{
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMAddUserConversationMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMAddUserConversationMessage'] = ResolversParentTypes['ResMAddUserConversationMessage']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMAddUserGalleryCodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMAddUserGalleryCode'] = ResolversParentTypes['ResMAddUserGalleryCode']> = ResolversObject<{
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMAddUserGalleryTickResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMAddUserGalleryTick'] = ResolversParentTypes['ResMAddUserGalleryTick']> = ResolversObject<{
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  ticksNew?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMCleanUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMCleanUser'] = ResolversParentTypes['ResMCleanUser']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMCleanUserConversationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMCleanUserConversations'] = ResolversParentTypes['ResMCleanUserConversations']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMCleanUserFollowedGalleriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMCleanUserFollowedGalleries'] = ResolversParentTypes['ResMCleanUserFollowedGalleries']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMCleanUserNotificationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMCleanUserNotifications'] = ResolversParentTypes['ResMCleanUserNotifications']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMCleanUserSurfacesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMCleanUserSurfaces'] = ResolversParentTypes['ResMCleanUserSurfaces']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMDeleteArtworkResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMDeleteArtwork'] = ResolversParentTypes['ResMDeleteArtwork']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMDeleteSurfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMDeleteSurface'] = ResolversParentTypes['ResMDeleteSurface']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMDeleteUserAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMDeleteUserAccount'] = ResolversParentTypes['ResMDeleteUserAccount']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMDeleteWallResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMDeleteWall'] = ResolversParentTypes['ResMDeleteWall']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMMergeUsersFollowedGalleriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMMergeUsersFollowedGalleries'] = ResolversParentTypes['ResMMergeUsersFollowedGalleries']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMRemoveUserGalleryCodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMRemoveUserGalleryCode'] = ResolversParentTypes['ResMRemoveUserGalleryCode']> = ResolversObject<{
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMReportChatAbuseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMReportChatAbuse'] = ResolversParentTypes['ResMReportChatAbuse']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetDebugValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetDebugValue'] = ResolversParentTypes['ResMSetDebugValue']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetGalleryProtectionDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetGalleryProtectionData'] = ResolversParentTypes['ResMSetGalleryProtectionData']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetSurfaceTagsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetSurfaceTags'] = ResolversParentTypes['ResMSetSurfaceTags']> = ResolversObject<{
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserArtistLikedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserArtistLiked'] = ResolversParentTypes['ResMSetUserArtistLiked']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserArtistSeenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserArtistSeen'] = ResolversParentTypes['ResMSetUserArtistSeen']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserArtworkDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserArtworkData'] = ResolversParentTypes['ResMSetUserArtworkData']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserArtworkLikedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserArtworkLiked'] = ResolversParentTypes['ResMSetUserArtworkLiked']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserArtworkSeenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserArtworkSeen'] = ResolversParentTypes['ResMSetUserArtworkSeen']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserArtworksExploreStatiResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserArtworksExploreStati'] = ResolversParentTypes['ResMSetUserArtworksExploreStati']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserBlogLikedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserBlogLiked'] = ResolversParentTypes['ResMSetUserBlogLiked']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserBlogSeenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserBlogSeen'] = ResolversParentTypes['ResMSetUserBlogSeen']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserEventLikedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserEventLiked'] = ResolversParentTypes['ResMSetUserEventLiked']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserEventSeenResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserEventSeen'] = ResolversParentTypes['ResMSetUserEventSeen']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserGalleryFavoritedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserGalleryFavorited'] = ResolversParentTypes['ResMSetUserGalleryFavorited']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserGalleryPasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserGalleryPassword'] = ResolversParentTypes['ResMSetUserGalleryPassword']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserOwnSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserOwnSettings'] = ResolversParentTypes['ResMSetUserOwnSettings']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserSurfaceDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserSurfaceData'] = ResolversParentTypes['ResMSetUserSurfaceData']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserWallDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserWallData'] = ResolversParentTypes['ResMSetUserWallData']> = ResolversObject<{
  actions?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResMSetUserWallLikedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResMSetUserWallLiked'] = ResolversParentTypes['ResMSetUserWallLiked']> = ResolversObject<{
  actions?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  amountActions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResSArtistUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResSArtistUpdated'] = ResolversParentTypes['ResSArtistUpdated']> = ResolversObject<{
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResSArtworkUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResSArtworkUpdated'] = ResolversParentTypes['ResSArtworkUpdated']> = ResolversObject<{
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResSGalleryUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResSGalleryUpdated'] = ResolversParentTypes['ResSGalleryUpdated']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  keysType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['GalleryUpdatedType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResSSurfaceUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResSSurfaceUpdated'] = ResolversParentTypes['ResSSurfaceUpdated']> = ResolversObject<{
  surfaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResSUserUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResSUserUpdated'] = ResolversParentTypes['ResSUserUpdated']> = ResolversObject<{
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  keysType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['UserUpdatedType'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResSWallUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResSWallUpdated'] = ResolversParentTypes['ResSWallUpdated']> = ResolversObject<{
  artworkSlug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idFirebase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idGeneric?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  surfaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SlugsInLangsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SlugsInLangs'] = ResolversParentTypes['SlugsInLangs']> = ResolversObject<{
  de?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  en?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  es?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  artists?: Resolver<ResolversTypes['ArtistsStats'], ParentType, ContextType>;
  artworkCategories?: Resolver<Maybe<ResolversTypes['ArtworkCategoriesStats']>, ParentType, ContextType>;
  artworkMaterials?: Resolver<Maybe<ResolversTypes['ArtworkMaterialsStats']>, ParentType, ContextType>;
  artworkTechniques?: Resolver<Maybe<ResolversTypes['ArtworkTechniquesStats']>, ParentType, ContextType>;
  artworks?: Resolver<ResolversTypes['ArtworksStats'], ParentType, ContextType>;
  events?: Resolver<ResolversTypes['EventsStats'], ParentType, ContextType>;
  galleries?: Resolver<ResolversTypes['GalleriesStats'], ParentType, ContextType>;
  surfaces?: Resolver<ResolversTypes['SurfacesStats'], ParentType, ContextType>;
  sync?: Resolver<Maybe<ResolversTypes['SyncStatus']>, ParentType, ContextType>;
  userInteractions?: Resolver<Maybe<ResolversTypes['UserInteractionsStats']>, ParentType, ContextType>;
  users?: Resolver<ResolversTypes['UsersStats'], ParentType, ContextType>;
  walls?: Resolver<ResolversTypes['WallsStats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = ResolversObject<{
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamItem'] = ResolversParentTypes['StreamItem']> = ResolversObject<{
  _meta?: Resolver<ResolversTypes['StreamItemMeta'], ParentType, ContextType>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  artwork?: Resolver<Maybe<ResolversTypes['Artwork']>, ParentType, ContextType>;
  blog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType>;
  codes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  createdR?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  gallery?: Resolver<Maybe<ResolversTypes['StreamItemGallery']>, ParentType, ContextType>;
  galleryFull?: Resolver<Maybe<ResolversTypes['Gallery']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['ImageSingle']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StreamItemType'], ParentType, ContextType>;
  typeData?: Resolver<ResolversTypes['StreamItemTypeData'], ParentType, ContextType>;
  userLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  wall?: Resolver<Maybe<ResolversTypes['Wall']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamItemGalleryResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamItemGallery'] = ResolversParentTypes['StreamItemGallery']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamItemMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamItemMeta'] = ResolversParentTypes['StreamItemMeta']> = ResolversObject<{
  artistsIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  artworkSlug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artworkVariantIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  idGeneric?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['DimensionsUnit']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamItemTypeDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamItemTypeData'] = ResolversParentTypes['StreamItemTypeData']> = ResolversObject<{
  listImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamItemsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamItems'] = ResolversParentTypes['StreamItems']> = ResolversObject<{
  items?: Resolver<Maybe<Array<ResolversTypes['StreamItem']>>, ParentType, ContextType>;
  pagination?: Resolver<Maybe<ResolversTypes['StreamItemsPagination']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamItemsFilterValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamItemsFilterValues'] = ResolversParentTypes['StreamItemsFilterValues']> = ResolversObject<{
  hasArtists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasArtworks?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasBlogs?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasEvents?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasWalls?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamItemsPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamItemsPagination'] = ResolversParentTypes['StreamItemsPagination']> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastReturnedCreated?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  lastReturnedCreatedR?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  returned?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StringInLangsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StringInLangs'] = ResolversParentTypes['StringInLangs']> = ResolversObject<{
  de?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  en?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  es?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  artistUpdated?: SubscriptionResolver<ResolversTypes['ResSArtistUpdated'], "artistUpdated", ParentType, ContextType, RequireFields<SubscriptionArtistUpdatedArgs, 'slug'>>;
  artworkUpdated?: SubscriptionResolver<ResolversTypes['ResSArtworkUpdated'], "artworkUpdated", ParentType, ContextType, RequireFields<SubscriptionArtworkUpdatedArgs, 'slug'>>;
  galleryUpdated?: SubscriptionResolver<ResolversTypes['ResSGalleryUpdated'], "galleryUpdated", ParentType, ContextType, RequireFields<SubscriptionGalleryUpdatedArgs, 'code'>>;
  newEvent?: SubscriptionResolver<Maybe<ResolversTypes['Event']>, "newEvent", ParentType, ContextType>;
  surfaceUpdated?: SubscriptionResolver<ResolversTypes['ResSSurfaceUpdated'], "surfaceUpdated", ParentType, ContextType, RequireFields<SubscriptionSurfaceUpdatedArgs, 'surfaceId'>>;
  userUpdated?: SubscriptionResolver<ResolversTypes['ResSUserUpdated'], "userUpdated", ParentType, ContextType, RequireFields<SubscriptionUserUpdatedArgs, 'uid'>>;
  wallUpdated?: SubscriptionResolver<ResolversTypes['ResSWallUpdated'], "wallUpdated", ParentType, ContextType, RequireFields<SubscriptionWallUpdatedArgs, 'idGeneric'>>;
}>;

export type SurfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Surface'] = ResolversParentTypes['Surface']> = ResolversObject<{
  amountsWalls?: Resolver<Maybe<ResolversTypes['SurfaceAmountsWalls']>, ParentType, ContextType>;
  blocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  boundaries?: Resolver<ResolversTypes['SurfaceBoundaries'], ParentType, ContextType>;
  boundariesDims?: Resolver<Maybe<ResolversTypes['SurfaceBoundariesDims']>, ParentType, ContextType>;
  boundariesDimsCm?: Resolver<Maybe<ResolversTypes['SurfaceBoundariesDimsCm']>, ParentType, ContextType>;
  center?: Resolver<Maybe<ResolversTypes['SurfaceCenter']>, ParentType, ContextType>;
  cornersUser?: Resolver<Maybe<ResolversTypes['SurfaceCornersUser']>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdById?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdByMe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dimensions?: Resolver<Maybe<ResolversTypes['SurfaceDimensions']>, ParentType, ContextType>;
  dimensionsCm?: Resolver<Maybe<ResolversTypes['SurfaceDimensionsCm']>, ParentType, ContextType>;
  firebaseEditUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasBoundaries?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageFullUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  insets?: Resolver<Maybe<ResolversTypes['SurfaceInsets']>, ParentType, ContextType>;
  original?: Resolver<Maybe<ResolversTypes['SurfaceOriginal']>, ParentType, ContextType>;
  propsSurface?: Resolver<Maybe<ResolversTypes['SurfacePropsSurface']>, ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  publicGalleries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Gallery']>>>, ParentType, ContextType>;
  publicGalleriesIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  valuesHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  walls?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceAmountsWallsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceAmountsWalls'] = ResolversParentTypes['SurfaceAmountsWalls']> = ResolversObject<{
  public?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceBoundariesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceBoundaries'] = ResolversParentTypes['SurfaceBoundaries']> = ResolversObject<{
  b?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  l?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  r?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  t?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceBoundariesDimsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceBoundariesDims'] = ResolversParentTypes['SurfaceBoundariesDims']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceBoundariesDimsCmResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceBoundariesDimsCm'] = ResolversParentTypes['SurfaceBoundariesDimsCm']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceCenterResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceCenter'] = ResolversParentTypes['SurfaceCenter']> = ResolversObject<{
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceCornersUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceCornersUser'] = ResolversParentTypes['SurfaceCornersUser']> = ResolversObject<{
  bl?: Resolver<ResolversTypes['SurfaceCornersUserPoint'], ParentType, ContextType>;
  br?: Resolver<ResolversTypes['SurfaceCornersUserPoint'], ParentType, ContextType>;
  tl?: Resolver<ResolversTypes['SurfaceCornersUserPoint'], ParentType, ContextType>;
  tr?: Resolver<ResolversTypes['SurfaceCornersUserPoint'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceCornersUserPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceCornersUserPoint'] = ResolversParentTypes['SurfaceCornersUserPoint']> = ResolversObject<{
  x?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceDimensionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceDimensions'] = ResolversParentTypes['SurfaceDimensions']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceDimensionsCmResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceDimensionsCm'] = ResolversParentTypes['SurfaceDimensionsCm']> = ResolversObject<{
  height?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceInsetsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceInsets'] = ResolversParentTypes['SurfaceInsets']> = ResolversObject<{
  b?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  l?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  r?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  t?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfaceOriginalResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfaceOriginal'] = ResolversParentTypes['SurfaceOriginal']> = ResolversObject<{
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  uploaded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfacePropsSurfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfacePropsSurface'] = ResolversParentTypes['SurfacePropsSurface']> = ResolversObject<{
  lightness?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  saturation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shadowAlpha?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shadowAngle?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shadowBlurStrength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  shadowDistance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfacesAdminsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfacesAdmins'] = ResolversParentTypes['SurfacesAdmins']> = ResolversObject<{
  amountGalleries?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amountSurfaces?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  galleries?: Resolver<Maybe<Array<ResolversTypes['Gallery']>>, ParentType, ContextType>;
  surfaces?: Resolver<Maybe<Array<ResolversTypes['Surface']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SurfacesStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurfacesStats'] = ResolversParentTypes['SurfacesStats']> = ResolversObject<{
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalNonAdmins?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalNonAdminsIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  totalNotOnWalls?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalNotOnWallsIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SyncStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['SyncStatus'] = ResolversParentTypes['SyncStatus']> = ResolversObject<{
  action?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finishTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  progressPct?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  startTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stepsDone?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stepsTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TabBarLabelsCategorizedInLangResolvers<ContextType = any, ParentType extends ResolversParentTypes['TabBarLabelsCategorizedInLang'] = ResolversParentTypes['TabBarLabelsCategorizedInLang']> = ResolversObject<{
  default?: Resolver<ResolversTypes['TabBarLabelsInLang'], ParentType, ContextType>;
  final?: Resolver<ResolversTypes['TabBarLabelsInLang'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TabBarLabelsInLangResolvers<ContextType = any, ParentType extends ResolversParentTypes['TabBarLabelsInLang'] = ResolversParentTypes['TabBarLabelsInLang']> = ResolversObject<{
  Artists?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Artworks?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Home?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Profile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Walls?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TabBarLabelsInLangsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TabBarLabelsInLangs'] = ResolversParentTypes['TabBarLabelsInLangs']> = ResolversObject<{
  de?: Resolver<ResolversTypes['TabBarLabelsCategorizedInLang'], ParentType, ContextType>;
  en?: Resolver<ResolversTypes['TabBarLabelsCategorizedInLang'], ParentType, ContextType>;
  es?: Resolver<ResolversTypes['TabBarLabelsCategorizedInLang'], ParentType, ContextType>;
  fr?: Resolver<ResolversTypes['TabBarLabelsCategorizedInLang'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TriggeredNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TriggeredNotification'] = ResolversParentTypes['TriggeredNotification']> = ResolversObject<{
  amountType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  singleArtist?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  useArtistGenders?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  useGalleryGenders?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  admin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  amountArtistsLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountArtworksExplored?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountArtworksLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountBlogsLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountCoursesLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountEventsLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountExhibitionsLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountGalleriesFollowed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountGalleriesManaged?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountSurfacesCreated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountWallsCreated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amountWallsLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  artistsLiked?: Resolver<Maybe<Array<ResolversTypes['Artist']>>, ParentType, ContextType, Partial<UserArtistsLikedArgs>>;
  artworksLiked?: Resolver<Maybe<Array<ResolversTypes['Artwork']>>, ParentType, ContextType, Partial<UserArtworksLikedArgs>>;
  created?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  createdReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currencySetOnce?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  fcmTokensAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  galleriesManaged?: Resolver<Maybe<Array<ResolversTypes['Gallery']>>, ParentType, ContextType, Partial<UserGalleriesManagedArgs>>;
  galleryPasswords?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastActive?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  lastActiveAppLang?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastActiveCountryCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastActiveReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastActiveTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  photoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photoUrlThumb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  syncedOnce?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitSetOnce?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  wallsCreated?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType, Partial<UserWallsCreatedArgs>>;
  wallsLiked?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType, Partial<UserWallsLikedArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserInteractionsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInteractionsStats'] = ResolversParentTypes['UserInteractionsStats']> = ResolversObject<{
  exploredArtwork?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  followedGallery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedArtist?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedArtwork?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  likedWall?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seenArtist?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seenArtwork?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserWithMetaTimesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithMetaTimes'] = ResolversParentTypes['UserWithMetaTimes']> = ResolversObject<{
  created?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserWithMetaTimesAndTicksResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithMetaTimesAndTicks'] = ResolversParentTypes['UserWithMetaTimesAndTicks']> = ResolversObject<{
  created?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ticks?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersStats'] = ResolversParentTypes['UsersStats']> = ResolversObject<{
  admin?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  adminEmails?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WallResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wall'] = ResolversParentTypes['Wall']> = ResolversObject<{
  artistTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artistsTitles?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artwork?: Resolver<Maybe<ResolversTypes['Artwork']>, ParentType, ContextType, Partial<WallArtworkArgs>>;
  artworkInGalleryNotAllowingPublicWallsAllUsers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  artworkSlug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  artworkTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artworkVariantIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  blocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  boundaries?: Resolver<Maybe<ResolversTypes['SurfaceBoundaries']>, ParentType, ContextType>;
  boundariesDims?: Resolver<Maybe<ResolversTypes['SurfaceBoundariesDims']>, ParentType, ContextType>;
  center?: Resolver<Maybe<ResolversTypes['SurfaceCenter']>, ParentType, ContextType>;
  cornersUser?: Resolver<Maybe<ResolversTypes['SurfaceCornersUser']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdByGalleryManager?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdById?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByMe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdByRequestingUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dimensions?: Resolver<Maybe<ResolversTypes['SurfaceDimensions']>, ParentType, ContextType>;
  galleriesCodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  galleriesProtectedCodes?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  galleriesTitles?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idFirebase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageThumbUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageWebUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inProtectedGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  insets?: Resolver<Maybe<ResolversTypes['SurfaceInsets']>, ParentType, ContextType>;
  lastImageUploadHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original?: Resolver<Maybe<ResolversTypes['SurfaceOriginal']>, ParentType, ContextType>;
  propsSurface?: Resolver<Maybe<ResolversTypes['SurfacePropsSurface']>, ParentType, ContextType>;
  public?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stagingOnly?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  surface?: Resolver<Maybe<ResolversTypes['Surface']>, ParentType, ContextType, Partial<WallSurfaceArgs>>;
  surfaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalLikes?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserWithMetaTimes']>>>, ParentType, ContextType>;
  updated?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updatedReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userAccessData?: Resolver<Maybe<ResolversTypes['ProtectedContentUserAccessData']>, ParentType, ContextType>;
  userCanAccessProtectedContent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanEdit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userCanOrCantAccessProtectedContentReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userCanOrCantShareToInstagramReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userCanShareToInstagram?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userLikedTime?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  userLikedTimeReadable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userManagesGallery?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  valuesHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WallInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['WallInfos'] = ResolversParentTypes['WallInfos']> = ResolversObject<{
  artworkInGalleryNotAllowingPublicWallsAllUsers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canBeMadePublic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  canBeUsed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  cantBeMadePublicReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userWallExists?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userWallValuesHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  walls?: Resolver<Maybe<Array<ResolversTypes['Wall']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WallsStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WallsStats'] = ResolversParentTypes['WallsStats']> = ResolversObject<{
  public?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publicNonAdmins?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publicNonAdminsIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  publicNonAdminsIdsLatest?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  publicNonAdminsNonManagers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publicNonAdminsNonManagersIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  publicNonAdminsNonManagersIdsLatest?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalNonAdmins?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WebSeoDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebSeoData'] = ResolversParentTypes['WebSeoData']> = ResolversObject<{
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogImageHeight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ogImageWidth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ogLocale?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogSiteName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  titleRaw?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitterCard?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitterDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitterImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitterTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AnalyticsEvent?: AnalyticsEventResolvers<ContextType>;
  AnalyticsEventDataEntry?: AnalyticsEventDataEntryResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  ArtistCurriculumEntry?: ArtistCurriculumEntryResolvers<ContextType>;
  ArtistsStats?: ArtistsStatsResolvers<ContextType>;
  Artwork?: ArtworkResolvers<ContextType>;
  ArtworkCategoriesStats?: ArtworkCategoriesStatsResolvers<ContextType>;
  ArtworkCategory?: ArtworkCategoryResolvers<ContextType>;
  ArtworkDimensions?: ArtworkDimensionsResolvers<ContextType>;
  ArtworkFilterValuesColor?: ArtworkFilterValuesColorResolvers<ContextType>;
  ArtworkFilterValuesMaterial?: ArtworkFilterValuesMaterialResolvers<ContextType>;
  ArtworkFilterValuesTechnique?: ArtworkFilterValuesTechniqueResolvers<ContextType>;
  ArtworkMaterial?: ArtworkMaterialResolvers<ContextType>;
  ArtworkMaterialOrTechniqueToFix?: ArtworkMaterialOrTechniqueToFixResolvers<ContextType>;
  ArtworkMaterialOrTechniqueToFixSlugsDetails?: ArtworkMaterialOrTechniqueToFixSlugsDetailsResolvers<ContextType>;
  ArtworkMaterialsOrTechniquesToFix?: ArtworkMaterialsOrTechniquesToFixResolvers<ContextType>;
  ArtworkMaterialsStats?: ArtworkMaterialsStatsResolvers<ContextType>;
  ArtworkOriginalImage?: ArtworkOriginalImageResolvers<ContextType>;
  ArtworkTechnique?: ArtworkTechniqueResolvers<ContextType>;
  ArtworkTechniquesStats?: ArtworkTechniquesStatsResolvers<ContextType>;
  ArtworkVariant?: ArtworkVariantResolvers<ContextType>;
  ArtworksDefaultGallery?: ArtworksDefaultGalleryResolvers<ContextType>;
  ArtworksFilterValues?: ArtworksFilterValuesResolvers<ContextType>;
  ArtworksStats?: ArtworksStatsResolvers<ContextType>;
  AuthTokenInfo?: AuthTokenInfoResolvers<ContextType>;
  AuthTokenInfoTokenInfos?: AuthTokenInfoTokenInfosResolvers<ContextType>;
  AvailabilityStati?: AvailabilityStatiResolvers<ContextType>;
  AvailabilityStatusSingle?: AvailabilityStatusSingleResolvers<ContextType>;
  Blog?: BlogResolvers<ContextType>;
  BlogLink?: BlogLinkResolvers<ContextType>;
  BranchLink?: BranchLinkResolvers<ContextType>;
  BranchLinkDebugData?: BranchLinkDebugDataResolvers<ContextType>;
  BranchLinkQrData?: BranchLinkQrDataResolvers<ContextType>;
  BranchLinkSeoData?: BranchLinkSeoDataResolvers<ContextType>;
  BranchUrlInfos?: BranchUrlInfosResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Countries?: CountriesResolvers<ContextType>;
  CountrySingle?: CountrySingleResolvers<ContextType>;
  CurrencyConverted?: CurrencyConvertedResolvers<ContextType>;
  CurrencyConvertedValue?: CurrencyConvertedValueResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateStartEndParts?: DateStartEndPartsResolvers<ContextType>;
  DbObjectId?: GraphQLScalarType;
  DebugValue?: DebugValueResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventCategories?: EventCategoriesResolvers<ContextType>;
  EventCategory?: EventCategoryResolvers<ContextType>;
  EventFilterValueCategory?: EventFilterValueCategoryResolvers<ContextType>;
  EventFilterValueCityEntry?: EventFilterValueCityEntryResolvers<ContextType>;
  EventFilterValueTimeRange?: EventFilterValueTimeRangeResolvers<ContextType>;
  EventsFilterValues?: EventsFilterValuesResolvers<ContextType>;
  EventsStats?: EventsStatsResolvers<ContextType>;
  ExternalOrganizer?: ExternalOrganizerResolvers<ContextType>;
  GalleriesStats?: GalleriesStatsResolvers<ContextType>;
  Gallery?: GalleryResolvers<ContextType>;
  GalleryAnalytics?: GalleryAnalyticsResolvers<ContextType>;
  GalleryAnalyticsFollowers?: GalleryAnalyticsFollowersResolvers<ContextType>;
  GalleryAnalyticsFollowersSingle?: GalleryAnalyticsFollowersSingleResolvers<ContextType>;
  GalleryAnalyticsFollowersValue?: GalleryAnalyticsFollowersValueResolvers<ContextType>;
  GalleryAnalyticsPublications?: GalleryAnalyticsPublicationsResolvers<ContextType>;
  GalleryAnalyticsPublicationsSingle?: GalleryAnalyticsPublicationsSingleResolvers<ContextType>;
  GalleryAnalyticsPublicationsValue?: GalleryAnalyticsPublicationsValueResolvers<ContextType>;
  GalleryAnalyticsRangeValues?: GalleryAnalyticsRangeValuesResolvers<ContextType>;
  GalleryAnalyticsRangeValuesLabel?: GalleryAnalyticsRangeValuesLabelResolvers<ContextType>;
  GalleryAnalyticsRangeValuesStartEnd?: GalleryAnalyticsRangeValuesStartEndResolvers<ContextType>;
  GalleryBasic?: GalleryBasicResolvers<ContextType>;
  GalleryBilling?: GalleryBillingResolvers<ContextType>;
  GalleryBillingContractNetGain?: GalleryBillingContractNetGainResolvers<ContextType>;
  GalleryBillingContractNetGainPart?: GalleryBillingContractNetGainPartResolvers<ContextType>;
  GalleryBillingContracts?: GalleryBillingContractsResolvers<ContextType>;
  GalleryBillingContractsNextRenewalCosts?: GalleryBillingContractsNextRenewalCostsResolvers<ContextType>;
  GalleryBrandingInfos?: GalleryBrandingInfosResolvers<ContextType>;
  GalleryManagedWithFollowers?: GalleryManagedWithFollowersResolvers<ContextType>;
  GalleryOneTimeCharge?: GalleryOneTimeChargeResolvers<ContextType>;
  GalleryPackage?: GalleryPackageResolvers<ContextType>;
  GalleryPreview?: GalleryPreviewResolvers<ContextType>;
  GalleryProtectionData?: GalleryProtectionDataResolvers<ContextType>;
  GalleryProtectionDataEmailRule?: GalleryProtectionDataEmailRuleResolvers<ContextType>;
  GalleryProtectionDataPassword?: GalleryProtectionDataPasswordResolvers<ContextType>;
  GalleryTabBarLabel?: GalleryTabBarLabelResolvers<ContextType>;
  GeoCoordinates?: GeoCoordinatesResolvers<ContextType>;
  GooglePlaceById?: GooglePlaceByIdResolvers<ContextType>;
  GooglePlacesBySearch?: GooglePlacesBySearchResolvers<ContextType>;
  GooglePlacesBySearchResult?: GooglePlacesBySearchResultResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  ImageSingle?: ImageSingleResolvers<ContextType>;
  ImageSize?: ImageSizeResolvers<ContextType>;
  ImageWp?: ImageWpResolvers<ContextType>;
  ImageWpSizes?: ImageWpSizesResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LocationLatLng?: LocationLatLngResolvers<ContextType>;
  LocationSearch?: LocationSearchResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OpeningHoursEntry?: OpeningHoursEntryResolvers<ContextType>;
  ProfileInfos?: ProfileInfosResolvers<ContextType>;
  ProfileInfosTypeExtras?: ProfileInfosTypeExtrasResolvers<ContextType>;
  ProtectedContentUserAccessData?: ProtectedContentUserAccessDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResMAddAnalyticsEvent?: ResMAddAnalyticsEventResolvers<ContextType>;
  ResMAddUserConversationMessage?: ResMAddUserConversationMessageResolvers<ContextType>;
  ResMAddUserGalleryCode?: ResMAddUserGalleryCodeResolvers<ContextType>;
  ResMAddUserGalleryTick?: ResMAddUserGalleryTickResolvers<ContextType>;
  ResMCleanUser?: ResMCleanUserResolvers<ContextType>;
  ResMCleanUserConversations?: ResMCleanUserConversationsResolvers<ContextType>;
  ResMCleanUserFollowedGalleries?: ResMCleanUserFollowedGalleriesResolvers<ContextType>;
  ResMCleanUserNotifications?: ResMCleanUserNotificationsResolvers<ContextType>;
  ResMCleanUserSurfaces?: ResMCleanUserSurfacesResolvers<ContextType>;
  ResMDeleteArtwork?: ResMDeleteArtworkResolvers<ContextType>;
  ResMDeleteSurface?: ResMDeleteSurfaceResolvers<ContextType>;
  ResMDeleteUserAccount?: ResMDeleteUserAccountResolvers<ContextType>;
  ResMDeleteWall?: ResMDeleteWallResolvers<ContextType>;
  ResMMergeUsersFollowedGalleries?: ResMMergeUsersFollowedGalleriesResolvers<ContextType>;
  ResMRemoveUserGalleryCode?: ResMRemoveUserGalleryCodeResolvers<ContextType>;
  ResMReportChatAbuse?: ResMReportChatAbuseResolvers<ContextType>;
  ResMSetDebugValue?: ResMSetDebugValueResolvers<ContextType>;
  ResMSetGalleryProtectionData?: ResMSetGalleryProtectionDataResolvers<ContextType>;
  ResMSetSurfaceTags?: ResMSetSurfaceTagsResolvers<ContextType>;
  ResMSetUserArtistLiked?: ResMSetUserArtistLikedResolvers<ContextType>;
  ResMSetUserArtistSeen?: ResMSetUserArtistSeenResolvers<ContextType>;
  ResMSetUserArtworkData?: ResMSetUserArtworkDataResolvers<ContextType>;
  ResMSetUserArtworkLiked?: ResMSetUserArtworkLikedResolvers<ContextType>;
  ResMSetUserArtworkSeen?: ResMSetUserArtworkSeenResolvers<ContextType>;
  ResMSetUserArtworksExploreStati?: ResMSetUserArtworksExploreStatiResolvers<ContextType>;
  ResMSetUserBlogLiked?: ResMSetUserBlogLikedResolvers<ContextType>;
  ResMSetUserBlogSeen?: ResMSetUserBlogSeenResolvers<ContextType>;
  ResMSetUserEventLiked?: ResMSetUserEventLikedResolvers<ContextType>;
  ResMSetUserEventSeen?: ResMSetUserEventSeenResolvers<ContextType>;
  ResMSetUserGalleryFavorited?: ResMSetUserGalleryFavoritedResolvers<ContextType>;
  ResMSetUserGalleryPassword?: ResMSetUserGalleryPasswordResolvers<ContextType>;
  ResMSetUserOwnSettings?: ResMSetUserOwnSettingsResolvers<ContextType>;
  ResMSetUserSurfaceData?: ResMSetUserSurfaceDataResolvers<ContextType>;
  ResMSetUserWallData?: ResMSetUserWallDataResolvers<ContextType>;
  ResMSetUserWallLiked?: ResMSetUserWallLikedResolvers<ContextType>;
  ResSArtistUpdated?: ResSArtistUpdatedResolvers<ContextType>;
  ResSArtworkUpdated?: ResSArtworkUpdatedResolvers<ContextType>;
  ResSGalleryUpdated?: ResSGalleryUpdatedResolvers<ContextType>;
  ResSSurfaceUpdated?: ResSSurfaceUpdatedResolvers<ContextType>;
  ResSUserUpdated?: ResSUserUpdatedResolvers<ContextType>;
  ResSWallUpdated?: ResSWallUpdatedResolvers<ContextType>;
  SlugsInLangs?: SlugsInLangsResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  StreamItem?: StreamItemResolvers<ContextType>;
  StreamItemGallery?: StreamItemGalleryResolvers<ContextType>;
  StreamItemMeta?: StreamItemMetaResolvers<ContextType>;
  StreamItemTypeData?: StreamItemTypeDataResolvers<ContextType>;
  StreamItems?: StreamItemsResolvers<ContextType>;
  StreamItemsFilterValues?: StreamItemsFilterValuesResolvers<ContextType>;
  StreamItemsPagination?: StreamItemsPaginationResolvers<ContextType>;
  StringInLangs?: StringInLangsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Surface?: SurfaceResolvers<ContextType>;
  SurfaceAmountsWalls?: SurfaceAmountsWallsResolvers<ContextType>;
  SurfaceBoundaries?: SurfaceBoundariesResolvers<ContextType>;
  SurfaceBoundariesDims?: SurfaceBoundariesDimsResolvers<ContextType>;
  SurfaceBoundariesDimsCm?: SurfaceBoundariesDimsCmResolvers<ContextType>;
  SurfaceCenter?: SurfaceCenterResolvers<ContextType>;
  SurfaceCornersUser?: SurfaceCornersUserResolvers<ContextType>;
  SurfaceCornersUserPoint?: SurfaceCornersUserPointResolvers<ContextType>;
  SurfaceDimensions?: SurfaceDimensionsResolvers<ContextType>;
  SurfaceDimensionsCm?: SurfaceDimensionsCmResolvers<ContextType>;
  SurfaceInsets?: SurfaceInsetsResolvers<ContextType>;
  SurfaceOriginal?: SurfaceOriginalResolvers<ContextType>;
  SurfacePropsSurface?: SurfacePropsSurfaceResolvers<ContextType>;
  SurfacesAdmins?: SurfacesAdminsResolvers<ContextType>;
  SurfacesStats?: SurfacesStatsResolvers<ContextType>;
  SyncStatus?: SyncStatusResolvers<ContextType>;
  TabBarLabelsCategorizedInLang?: TabBarLabelsCategorizedInLangResolvers<ContextType>;
  TabBarLabelsInLang?: TabBarLabelsInLangResolvers<ContextType>;
  TabBarLabelsInLangs?: TabBarLabelsInLangsResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  TriggeredNotification?: TriggeredNotificationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserInteractionsStats?: UserInteractionsStatsResolvers<ContextType>;
  UserWithMetaTimes?: UserWithMetaTimesResolvers<ContextType>;
  UserWithMetaTimesAndTicks?: UserWithMetaTimesAndTicksResolvers<ContextType>;
  UsersStats?: UsersStatsResolvers<ContextType>;
  Wall?: WallResolvers<ContextType>;
  WallInfos?: WallInfosResolvers<ContextType>;
  WallsStats?: WallsStatsResolvers<ContextType>;
  WebSeoData?: WebSeoDataResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  spectaql?: SpectaqlDirectiveResolver<any, any, ContextType>;
}>;
