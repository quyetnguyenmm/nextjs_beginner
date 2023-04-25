import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

export interface PostPageProps {
  post: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10');
  const data = await response.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: true,
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
    props: { post: data },
    revalidate: 10,
  };
};

export default function PostDetailPage({ post }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div style={{ fontSize: '1.5rem', textAlign: 'center' }}>Loading...</div>;
  }

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
