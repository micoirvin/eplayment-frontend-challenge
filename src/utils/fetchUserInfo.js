import useSWR from 'swr';

export default function fetchUserInfo(userId) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  return useSWR(
    userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : null,
    fetcher
  );
}
