import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";

const NewProductPage = withAuthenticationRequired(
  () => {
    const navigate = useNavigate();

    return (
      <div>
        <Heading mb="4">New Product</Heading>
        <ProductForm
          onSubmit={async (product) => {
            await axios.post("/products", product);
            navigate("/admin/products");
          }}
        />
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

export default NewProductPage;
