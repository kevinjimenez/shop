export class Regex {
  static password = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*\\W).{4}');
}
