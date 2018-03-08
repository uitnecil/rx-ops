export class ReplyModel {
  constructor(public searchString: string,
              public replyDurationSeconds: number,
              public results?: string) {
  }
}
