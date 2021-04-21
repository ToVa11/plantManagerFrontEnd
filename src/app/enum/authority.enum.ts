export enum Authority {
  ROLE_READ = "Look at plants and families.",
  ROLE_PLANT_WRITE = "Create and update plants",
  ROLE_FAMILY_WRITE = "Create and update families",
  ROLE_PLANT_DELETE = "Delete plants",
  ROLE_FAMILY_DELETE = "Delete families",
  ROLE_PLANT_ADMIN = "Create, update and delete plants",
  ROLE_FAMILY_ADMIN = "Create, update and delete families",
  ROLE_SUPER_ADMIN = "Create, update and delete plants, families and create/delete users"
}