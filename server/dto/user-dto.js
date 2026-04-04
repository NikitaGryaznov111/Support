export class UserDto {
  userId;
  name;
  email;
  constructor(model) {
    this.userId = model.userId;
    this.name = model.name;
    this.email = model.email;
  }
}
