import type { Route } from "./+types/catalog";
import { BD_PRODUCTS } from "@shared/models/mock";
import type { TProductsResponse } from "@shared/models/types";
import catalog from "./catalog.module.css";
import { Product } from "@entities/product/product";

// запрос и метатег оставить на уровне страницы
export function meta({}: Route.MetaArgs) {
  return [{ title: "Catalog" }, { name: "description", content: "QPICK!" }];
}

export async function loader() {
  const products: TProductsResponse = await (function () {
    return BD_PRODUCTS.reduce<TProductsResponse>((acc, { type, ...product }) => {
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(product);
      return acc;
    }, {});
  })();

  return { products };
}
// запрос и метатег оставить на уровне страницы

// выделить виджет который отвечает за рендер присланных компонент и переданных в них пропсов через чайлд
export default function Catalog({ loaderData }: Route.ComponentProps) {
  const { products }: { products: TProductsResponse } = loaderData;
  const title = null;
  return (
    <main>
      <section className={catalog.catalog_section}>
        {title && <h1 className={catalog.catalog_section_title}>{title}</h1>}
        {Object.keys(products).map((type) => {
          return (
            <article className={catalog.catalog_section_wraparticle} key={type}>
              <h2 className={catalog.catalog_section_wraparticle_title}>
                {type}
              </h2>
              <div className={catalog.catalog_section_wraparticle_wrap}>
                {products[type].map((product) => {
                  return <Product key={product.id} product={product} />;
                })}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
// выделить виджет который отвечает за рендер присланных компонент и переданных в них пропсов через чайлд
