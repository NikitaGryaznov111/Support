export class UserDto {
  userId;
  email;
  password;
  constructor(model) {
    this.userId = model.userId;
    this.email = model.email;
    this.password = model.password;
  }
}
