import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import ProductForm from "../../src/components/ProductForm";
import useCategories from "../../src/hooks/useCategories";
import { productFormSchema } from "../../src/validationSchemas/productSchema";
import toast from "react-hot-toast";
import React from "react";
import AllProviders from "../AllProviders";
import { id } from "zod/v4/locales";
import { faker } from "@faker-js/faker";

vi.mock("../../src/hooks/useCategories", () => ({
  default: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
  },
}));

const mockCategories = [
  {
    id: 1,
    name: "Electronics",
  },
  {
    id: 2,
    name: "Appliances",
  },
  {
    id: 3,
    name: "Accessories",
  },
];

const mockOnSubmit = vi.fn();

describe("ProductForm", () => {
  const mockedUseCategories = useCategories as ReturnType<typeof vi.fn>;
  it("should render a loading message when categories are loading", () => {
    mockedUseCategories.mockReturnValue({
      data: null,
      isLoading: true,
    });
    render(<ProductForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should render the form with all fields", () => {
    mockedUseCategories.mockReturnValue({
      data: null,
      isLoading: false,
    });
    render(<ProductForm onSubmit={mockOnSubmit} />, { wrapper: AllProviders });
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Price/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("should submit the form with valid data", async () => {
    const validProduct = {
      id: faker.number.int(),
      name: "Test Product",
      price: 100,
      categoryId: 1,
    };
    console.log(validProduct);
    render(<ProductForm onSubmit={mockOnSubmit} product={validProduct} />, {
      wrapper: AllProviders,
    });
    mockedUseCategories.mockReturnValue({
      data: mockCategories,
      isLoading: false,
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith(validProduct)
    );
  });

});
