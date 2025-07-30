import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { db } from './mocks/db';

describe('db.product', () => {
    // Clean up the database after each test to ensure test isolation.
    beforeEach(() => {
        db.product.deleteMany({ where: {} }); 
    });

    afterEach(() => {

        db.product.deleteMany({ where: {} }); 
    });

    it('should allow creating and deleting a product', () => {

        const newProduct = db.product.create({ name: 'Apple' });
        console.log(newProduct)
        console.log(db.product.findMany({}))

        const deletedProduct = db.product.delete({
            where: { id: { equals: newProduct.id } },
        });

        expect(deletedProduct).toEqual(newProduct);

        const productInDb = db.product.findFirst({
            where: { id: { equals: newProduct.id } },
        });
        expect(productInDb).toBeNull();
    });
});