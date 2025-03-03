export class UserDto {
  userId;
  name;
  email;
  password;
  constructor(model) {
    this.userId = model.userId;
    this.name = model.name;
    this.email = model.email;
    this.password = model.password;
  }
}
