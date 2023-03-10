import * as React from 'react';
import { useProduct } from '../queries/product-queries';
import { ProductLink } from './product-link';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  day: 'numeric',
  month: 'short',
});

export const ProductDetails = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useProduct(productId);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && (
        <>
          <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
          <div className="flex flex-col md:flex-row gap-6">
            {data.images ? (
              <img
                src={data.images.webp}
                width={600}
                height={600}
                className="w-80 h-80"
                style={
                  {
                    viewTransitionName: `product-${data._id}`,
                  } as any
                }
              />
            ) : (
              <div
                className="flex justify-center items-center w-80 h-80 bg-gray-100"
                style={
                  {
                    viewTransitionName: `product-${data._id}`,
                  } as any
                }
              >
                <p className="text-gray-800">No preview</p>
              </div>
            )}
            <div className="flex-1 p-6 shadow">
              <dl className="flex flex-col gap-6">
                <div>
                  <dt>
                    <span className="sr-only">Price</span>
                  </dt>
                  <dd>
                    <strong className="text-2xl">{data.price}</strong>
                  </dd>
                </div>
                {data.descriptions && data.descriptions.length > 0 && (
                  <div>
                    <dt>
                      <span className="sr-only">Description</span>
                    </dt>
                    <dd>
                      <div className="flex gap-1">
                        {data.descriptions.map((d) => (
                          <span
                            className="text-xs px-2 rounded-lg text-gray-600 bg-gray-100"
                            key={d}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
                {data.related && data.related.length > 0 && (
                  <div>
                    <h2 className="text-sm text-gray-500">Related</h2>
                    {data.related.map((id) => (
                      <RelatedProduct productId={id} key={id} />
                    ))}
                  </div>
                )}
              </dl>
            </div>
          </div>
          {data.comments && data.comments.length > 0 && (
            <div className="px-2 [view-transition-name:comments]">
              <h2 className="mt-12 mb-6 text-gray-500">Comments</h2>
              <div className="flex flex-wrap gap-6">
                {data.comments.map((comment) => (
                  <article key={comment._id} className="p-3 shadow rounded">
                    <p className="text-xs text-gray-500">
                      {comment.userName} commented:
                    </p>
                    <p>{comment.content}</p>
                    <div className="text-right">
                      <small>
                        on{' '}
                        <time dateTime={comment.createdAt}>
                          {dateFormatter.format(new Date(comment.createdAt))}
                        </time>
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const RelatedProduct = (props: { productId: string }) => {
  const { data } = useProduct(props.productId);

  return data ? <ProductLink data={data} /> : null;
};
