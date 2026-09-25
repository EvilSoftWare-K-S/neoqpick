import type { Route } from "./+types/catalog";
import { BD_PRODUCTS } from "@shared/models/mock";
import type { TProduct, TProductsResponse } from "@shared/models/types";
import styles from "./catalog.module.css";
import { CatalogItem } from "@entities/catalog-item/catalog-item";
import Main from "@widgets/main/main";
import { ExpandButton, Modal } from "@widgets/modal/modal";
import { useState } from "react";
import { Button } from "@shared/button/button";
import { useFavorite } from "@shared/hooks/faborite/use-favorite";
import { getTranslation } from "@shared/utils/get-translate";
import type { TTranslationKey } from "@shared/dictionaries/dictionaries";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Catalog" }, { name: "description", content: "QPICK!" }];
}

export async function loader() {
  const products: TProductsResponse = await (function () {
    return BD_PRODUCTS.reduce<TProductsResponse>(
      (acc, { type, ...product }) => {
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(product);
        return acc;
      },
      {},
    );
  })();

  return { products };
}

export default function Catalog({ loaderData }: Route.ComponentProps) {
  const { products }: { products: TProductsResponse } = loaderData;
  const title = null;
  const { addToFavorite } = useFavorite();
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  return (
    <Main title={title}>
      <div className={styles.catalog}>
        {Object.keys(products).map((type) => (
          <article className={styles.catalog__section} key={type}>
            <h2 className={styles.catalog__title}>
              {getTranslation(type as TTranslationKey, "ru")}
            </h2>
            <div className={styles.catalog__grid}>
              {products[type].map((product) => (
                <CatalogItem
                  key={product.id}
                  product={product}
                  buttonExpand={
                    <ExpandButton
                      onOpen={() => setSelectedProduct(product)}
                      title={product.title}
                    />
                  }
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        footer={
          <Button
            variant="primary"
            onClick={() => addToFavorite(selectedProduct!)}
          >
            <img src="/icons/header/favorite.svg" alt="favorite"></img>
          </Button>
        }
      >
        {selectedProduct && (
          <div className={styles.modal}>
            <CatalogItem product={selectedProduct} />
            <p className={styles.modal__p}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              veniam delectus libero atque rem numquam odio, magni vero ullam
              eum iure perferendis, reprehenderit ratione, at rerum harum
              accusantium dignissimos eveniet.
            </p>
          </div>
        )}
      </Modal>
    </Main>
  );
}
