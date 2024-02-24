import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUser } from "@/hooks";
import { ROUTES } from "@/constants";
import { Loading } from "@/components";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: React.ComponentProps<any>) => {
    const { userLoggedIn, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        if (!loading && !userLoggedIn) {
          await router.push(ROUTES.LOGIN);
        }
      };

      checkAuth();
    }, [userLoggedIn, loading, router]);

    if (loading || !userLoggedIn) return <Loading />;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
