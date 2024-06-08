import React from "react";
import styles from "./App.module.css";
import { AppHeader } from "../AppHeader/AppHeader";

import { useDispatch, useSelector } from "./../../services/store";
import { useLocation } from "react-router-dom";
import { getItems } from "../../services/actions/ingredients";
import { checkToken } from "../../services/actions/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import {
  ProtectedRoute,
  ProtectedRouteForAuthUser,
  ProtectedResetRoute,
} from "../ProtectedRoute";
import { Modal } from "../Modal/Modal";
import { LastRouteProvider } from './../LastRouteContext';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems());
    dispatch(checkToken());
  }, []);

  const { isLoggedIn } = useSelector((store) => store.auth);
  const { isCodeRequested } = useSelector((store) => store.passwordReset);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <LastRouteProvider>
    <div className={styles.app}>
      <AppHeader />
      <main>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteForAuthUser isAllowed={isLoggedIn}>
                <LoginPage />
              </ProtectedRouteForAuthUser>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteForAuthUser isAllowed={isLoggedIn}>
                <RegisterPage />
              </ProtectedRouteForAuthUser>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteForAuthUser isAllowed={isLoggedIn}>
                <ForgotPasswordPage />
              </ProtectedRouteForAuthUser>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedResetRoute isAllowed={isCodeRequested}>
                <ResetPasswordPage />
              </ProtectedResetRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="ingredients/:id" element={<IngredientDetails />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={closeModal} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
    </LastRouteProvider>
  );
}

export default App;
