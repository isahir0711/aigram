export interface UserMediaRoot {
    data: Data
    extensions: Extensions
    status: string
  }
  
  export interface Data {
    user: User
  }
  
  export interface User {
    edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia
  }
  
  export interface EdgeOwnerToTimelineMedia {
    count: number
    page_info: PageInfo
    edges: Edge[]
  }
  
  export interface PageInfo {
    has_next_page: boolean
    end_cursor: string
  }
  
  export interface Edge {
    node: Node
  }
  
  export interface Node {
    __typename: string
    id: string
    gating_info: any
    fact_check_overall_rating: any
    fact_check_information: any
    media_overlay_info: any
    sensitivity_friction_info: any
    sharing_friction_info: SharingFrictionInfo
    dimensions: Dimensions
    display_url: string
    display_resources: DisplayResource[]
    is_video: boolean
    media_preview?: string
    tracking_token: string
    has_upcoming_event: boolean
    edge_media_to_tagged_user: EdgeMediaToTaggedUser
    dash_info?: DashInfo
    has_audio?: boolean
    video_url?: string
    video_view_count?: number
    edge_media_to_caption: EdgeMediaToCaption
    shortcode: string
    edge_media_to_comment: EdgeMediaToComment
    edge_media_to_sponsor_user: EdgeMediaToSponsorUser
    is_affiliate: boolean
    is_paid_partnership: boolean
    comments_disabled: boolean
    taken_at_timestamp: number
    edge_media_preview_like: EdgeMediaPreviewLike
    owner: Owner
    location: any
    nft_asset_info: any
    viewer_has_liked: boolean
    viewer_has_saved: boolean
    viewer_has_saved_to_collection: boolean
    viewer_in_photo_of_you: boolean
    viewer_can_reshare: boolean
    thumbnail_src: string
    thumbnail_resources: ThumbnailResource[]
    coauthor_producers: any[]
    pinned_for_users: any[]
    product_type?: string
    accessibility_caption: any
    edge_sidecar_to_children?: EdgeSidecarToChildren
  }
  
  export interface SharingFrictionInfo {
    should_have_sharing_friction: boolean
    bloks_app_url: any
  }
  
  export interface Dimensions {
    height: number
    width: number
  }
  
  export interface DisplayResource {
    src: string
    config_width: number
    config_height: number
  }
  
  export interface EdgeMediaToTaggedUser {
    edges: any[]
  }
  
  export interface DashInfo {
    is_dash_eligible: boolean
    video_dash_manifest: string
    number_of_qualities: number
  }
  
  export interface EdgeMediaToCaption {
    edges: Edge2[]
  }
  
  export interface Edge2 {
    node: Node2
  }
  
  export interface Node2 {
    text: string
  }
  
  export interface EdgeMediaToComment {
    count: number
    page_info: PageInfo2
  }
  
  export interface PageInfo2 {
    has_next_page: boolean
    end_cursor: string
  }
  
  export interface EdgeMediaToSponsorUser {
    edges: any[]
  }
  
  export interface EdgeMediaPreviewLike {
    count: number
    edges: any[]
  }
  
  export interface Owner {
    id: string
    username: string
  }
  
  export interface ThumbnailResource {
    src: string
    config_width: number
    config_height: number
  }
  
  export interface EdgeSidecarToChildren {
    edges: Edge3[]
  }
  
  export interface Edge3 {
    node: Node3
  }
  
  export interface Node3 {
    __typename: string
    id: string
    gating_info: any
    fact_check_overall_rating: any
    fact_check_information: any
    media_overlay_info: any
    sensitivity_friction_info: any
    sharing_friction_info: SharingFrictionInfo2
    dimensions: Dimensions2
    display_url: string
    display_resources: DisplayResource2[]
    is_video: boolean
    media_preview: string
    tracking_token: string
    has_upcoming_event: boolean
    edge_media_to_tagged_user: EdgeMediaToTaggedUser2
    accessibility_caption: any
  }
  
  export interface SharingFrictionInfo2 {
    should_have_sharing_friction: boolean
    bloks_app_url: any
  }
  
  export interface Dimensions2 {
    height: number
    width: number
  }
  
  export interface DisplayResource2 {
    src: string
    config_width: number
    config_height: number
  }
  
  export interface EdgeMediaToTaggedUser2 {
    edges: any[]
  }
  
  export interface Extensions {
    is_final: boolean
  }
  