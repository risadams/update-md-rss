import { Post } from './Post';

export type Feed = {
  title: string | undefined;
  posts: Post[];
};
