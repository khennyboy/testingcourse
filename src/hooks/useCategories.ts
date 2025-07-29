import axios from "axios";
import { useQuery } from "react-query";
import type { Category } from "../entities";
// import { Category } from "../entities";

const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => axios.get("/categories").then((res) => res.data),
  });
};

export default useCategories;
