import { UserUpdateDto } from './user-update.dto';

export class UserDto extends UserUpdateDto {
  readonly open_id: string;
  readonly union_id: string;
  readonly session_key: string;
  readonly avatar_url: string;
  readonly gender: number;
  readonly update_time: Date;
  readonly create_time: Date;
}
