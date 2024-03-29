'use client';
import { Box, Drawer, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  Product,
  selectBasket,
  selectBasketProducts,
  selectIsBasketOpen,
  setProducts,
  toggleBasketOpen,
} from '@/app/store/productsSlice';
import Icon from '@/components/Icon';
import { DrawerIcons } from '@/lib/constants';
import FavoritesCard from '@/components/FavoritesCard';
import BasketSummary from '@/components/BasketSummary';
import { useBasket } from '@/hooks/useBasket';
import { getSumPrice } from '@/lib/utils';

export interface Basket {
  id: string;
  userId: string;
  products: Product[];
}

export default function BasketDrawer() {
  const isBasketOpen = useAppSelector(selectIsBasketOpen);
  const dispatch = useAppDispatch();
  const { basket } = useBasket();

  const handleDrawerClose = () => {
    dispatch(toggleBasketOpen(false));
  };

  const sumPrice = getSumPrice(basket?.products);

  return (
    <Drawer open={isBasketOpen} anchor="right" onClose={handleDrawerClose}>
      <div className="w-96">
        <IconButton
          className="!absolute top-0 right-0"
          onClick={handleDrawerClose}
        >
          <Icon name={DrawerIcons.Close} className="!fill-dark-green" />
        </IconButton>
        <h3 className="text-3xl text-dark-green pt-2 pl-2">Basket</h3>
        <Box className="!flex justify-center items-center flex-col mt-8">
          {basket?.products.map((product) => (
            <FavoritesCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              id={product.id}
            />
          ))}
          <BasketSummary sumPrice={sumPrice} />
        </Box>
      </div>
    </Drawer>
  );
}
