import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUser } from "@/hooks";
import { ROUTES } from "@/constants";
import { Loading } from "@/components";

// Get actual mode
const developMode =
  typeof window !== "undefined"
    ? localStorage.getItem("developMode") === "true"
    : false;

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: React.ComponentProps<any>) => {
    const { userLoggedIn, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (!loading && !userLoggedIn && !developMode) {
            await router.push(ROUTES.LOGIN);
          }
        } catch (error) {
          if (error instanceof Error && error.message === "Unauthorized") {
            await router.push(ROUTES.LOGIN);
          }
        }
      };
      checkAuth();
    }, [userLoggedIn, loading, router]);

    if (!developMode || (!userLoggedIn && loading)) return <Loading />;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
