import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

export interface PostPageProps {
  post: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10');
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({
      params: {
        postId: post.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext,
) => {
  const postId = context.params?.postId;
  if (!postId) return { notFound: true };

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
};

export default function PostDetailPage({ post }: PostPageProps) {
  if (!post) return null;

  return (
    <div>
      <h1>Post Detail Page</h1>
      <h3>{post.title}</h3>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}
