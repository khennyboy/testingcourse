import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Flex, Spinner } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const AdminHomePage = withAuthenticationRequired(
  () => {
    return (
      <div>
        <h1>Admin Area</h1>
        <Link to="products">Products</Link>
      </div>
    );
  },
  {
    onRedirecting: () => (
      <Flex justify="center" align="center" style={{ height: "80vh" }}>
        <Spinner size="3" />
      </Flex>
    ),
  }
);

export default AdminHomePage;
