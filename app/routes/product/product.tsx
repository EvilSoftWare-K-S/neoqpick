import type { Route } from "./+types/product";
import { BD_PRODUCTS } from "@shared/models/mock";
import type { TProduct } from "@shared/models/types";
import styles from "./product.module.css";
import { CatalogItem } from "@entities/catalog-item/catalog-item";
import Main from "@widgets/main/main";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Product" }, { name: "description", content: "Product!" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const product = BD_PRODUCTS.find((p) => p.id === id) ?? null;

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  return { product };
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { product }: { product: TProduct } = loaderData;
  const title = null;
  return (
    <Main title={title}>
      <article className={styles.catalog_section_wraparticle}>
        <h2 className={styles.catalog_section_wraparticle_title}>
          {product.title}
        </h2>
        <div className={styles.catalog_section_wraparticle_wrap}>
          <CatalogItem product={product} />
        </div>
      </article>
    </Main>
  );
}
