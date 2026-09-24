import type { Route } from "./+types/catalog";
import { BD_PRODUCTS } from "@shared/models/mock";
import type { TProductsResponse } from "@shared/models/types";
import catalog from "./catalog.module.css";
import { CatalogItem } from "@entities/catalog-item/catalog-item";
import Main from "@widgets/main/main";

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
  return (
    <Main title={title}>
      {Object.keys(products).map((type) => {
        return (
          <article className={catalog.catalog_section_wraparticle} key={type}>
            <h2 className={catalog.catalog_section_wraparticle_title}>
              {type}
            </h2>
            <div className={catalog.catalog_section_wraparticle_wrap}>
              {products[type].map((product) => {
                return <CatalogItem key={product.id} product={product} />;
              })}
            </div>
          </article>
        );
      })}
    </Main>
  );
}
