import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, selectFeed } from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора
   * ВЗЯЛ
   */

  const feed = useSelector(selectFeed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getFeed());
  };

  if (!feed) {
    return <Preloader />;
  }

  // const orders: TOrder[] = [];

  // if (!feed.orders.length) {
  //   return <Preloader />;
  // }

  return <FeedUI orders={feed.orders} handleGetFeeds={handleRefresh} />;
};
