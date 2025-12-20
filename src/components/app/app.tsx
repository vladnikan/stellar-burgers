import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ModalUI } from '@ui';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <ModalUI title='Информация о заказе' onClose={handleClose}>
                <OrderInfo />
              </ModalUI>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <ModalUI title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </ModalUI>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ModalUI title='Номер' onClose={handleClose}>
                <OrderInfo />
              </ModalUI>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
