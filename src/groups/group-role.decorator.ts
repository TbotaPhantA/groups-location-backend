import { SetMetadata } from "@nestjs/common";

export type GroupRoleType = 'owner' | 'member';

export const ROLE_KEY = 'role';

export const GroupRole  = (role: GroupRoleType) => SetMetadata(ROLE_KEY, role);