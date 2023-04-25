import { MainLayout } from '@/components/layout';
import { AdminLayout } from '@/components/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = dynamic(() => import('@/components/common/Header'), { ssr: false });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter();
  const [postList, setPostList] = useState([]);

  const page = router.query?.page;

  function handleNextPageClick() {
    router.push(
      {
        pathname: '/about',
        query: { page: (Number(page) || 1) + 1 },
      },
      undefined,
      { shallow: true },
    );
  }

  useEffect(() => {
    if (!page) return;

    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_limit=10&_page=${page}`,
      );
      const data = await response.json();
      setPostList(data.data);
    })();
  }, [page]);

  return (
    <div>
      <h1>About Page</h1>
      <Header />
      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handleNextPageClick}>Next page</button>
    </div>
  );
}

AboutPage.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {},
  };
}
