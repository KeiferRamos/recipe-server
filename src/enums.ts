export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
}

export enum CategoryType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
}

export enum TimeType {
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
}

export enum Permissions {
  UPDATE_BLOG = 'update:blog',
  CREATE_BLOG = 'create:blog',
  CREATE_RECIPE = 'create:recipe',
  UPDATE_RECIPE = 'update:recipe',
  REMOVE_RECIPE = 'remove:recipe',
  REMOVE_BLOG = 'remove:blog',
  UPDATE_ROLE = 'update:role',
  CREATE_ROLE = 'create:role',
  REMOVE_ROLE = 'remove:role',
  REMOVE_USER = 'remove:user',
  UPDATE_USER_ROLE = 'update:user-role',
  REMOVE_PERMISSION = 'remove:permission',
  CREATE_PERMISSION = 'create:permission',
  UPDATE_PERMISSION = 'update:permission',
}
