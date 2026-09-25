import type { Route } from "./+types/product";
import { BD_PRODUCTS } from "@shared/models/mock";
import type { TProduct } from "@shared/models/types";
import styles from "./product.module.css";
import { CatalogItem } from "@entities/catalog-item/catalog-item";
import Main from "@widgets/main/main";
import { Button } from "@shared/button/button";
import { useFavorite } from "@shared/hooks/faborite/use-favorite";

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
  const { addToFavorite } = useFavorite();
  const title = product.title;
  return (
    <Main title={title}>
      <article className={styles.product}>
        <div className={styles.product__section}>
          <CatalogItem product={product} />
          <section className={styles.product__section__description}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              dicta beatae. Quae quibusdam nostrum asperiores impedit cupiditate
              mollitia aut harum quasi, eius itaque optio inventore debitis?
              Exercitationem sed similique ipsum.
            </p>
            <Button onClick={() => addToFavorite(product)}>
              <img src="/icons/header/favorite.svg" alt="favorite"></img>
            </Button>
          </section>
          <section className={styles.product__section__detailedDescription}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              quasi accusamus praesentium eveniet beatae vitae quaerat enim
              optio distinctio magni, ipsam voluptas nihil voluptates nostrum?
              Sunt rerum omnis possimus ab velit dolorum exercitationem,
              molestias non aperiam temporibus, sequi soluta? Quis odio animi
              voluptatibus eos consectetur recusandae architecto sapiente?
              Libero dolore veritatis facere voluptas, blanditiis nemo
              perferendis laboriosam, in accusamus nihil commodi harum amet,
              quibusdam laborum laudantium distinctio suscipit ipsam corrupti
              eaque error placeat adipisci quis fugit repudiandae. Blanditiis
              nesciunt, repellendus ullam porro id voluptate nulla dolorem nisi
              nobis delectus, incidunt dolor nam et, animi fugiat officiis odio
              cumque quod ducimus.
            </p>
          </section>
        </div>
      </article>
    </Main>
  );
}
