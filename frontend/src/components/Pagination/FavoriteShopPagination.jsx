import React, { useEffect } from "react";
import "./Pagination.scss";
import { getCustomerSearch } from "../../redux/search/searchSlice";
import { useDispatch } from "react-redux";

const FavoriteShopPagination = ({ pages, page, query }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const buttons = document.getElementsByClassName("page-number");
    [...buttons].map((button, key) => {
      Number(button.dataset.pageNumber) === page
        ? button.classList.add("active")
        : button.classList.remove("active");
    });
  }, [page]);

  return (
    <div className="pagination d-flex justify-content-center my-5">
      <div
        className="page shadow-sm d-flex justify-content-center align-items-center mx-2"
        onClick={() =>
          dispatch(
            getSearchFavoriteShop({
              query,
              pageSize: 15,
              page: pages - (pages - 1),
            })
          )
        }
      >
        S
      </div>

      {pages <= 5 &&
        Array(pages)
          .fill("")
          .map((petal, key) => {
            return (
              <div
                key={key}
                className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
                data-page-number={key + 1}
                onClick={() =>
                  dispatch(
                    getSearchFavoriteShop({
                      query,
                      pageSize: 15,
                      page: key + 1,
                    })
                  )
                }
              >
                {key + 1}
              </div>
            );
          })}

      {pages > 5 && (
        <>
          {pages - page < 1 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page - 4}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page - 4,
                  })
                )
              }
            >
              {page - 4}
            </div>
          )}
          {pages - page < 2 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page - 3}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page - 3,
                  })
                )
              }
            >
              {page - 3}
            </div>
          )}
          {page > 2 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page - 2}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page - 2,
                  })
                )
              }
            >
              {page - 2}
            </div>
          )}
          {page > 1 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page - 1}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page - 1,
                  })
                )
              }
            >
              {page - 1}
            </div>
          )}
          <div
            className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
            data-page-number={page}
            onClick={() =>
              dispatch(
                getSearchFavoriteShop({
                  query,
                  pageSize: 15,
                  page: page,
                })
              )
            }
          >
            {page}
          </div>
          {pages - page >= 1 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page + 1}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page + 1,
                  })
                )
              }
            >
              {page + 1}
            </div>
          )}
          {pages - page >= 2 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page + 2}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page + 2,
                  })
                )
              }
            >
              {page + 2}
            </div>
          )}
          {page < 3 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page + 3}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page + 3,
                  })
                )
              }
            >
              {page + 3}
            </div>
          )}
          {page < 2 && (
            <div
              className="page page-number shadow-sm d-flex justify-content-center align-items-center mx-2"
              data-page-number={page + 4}
              onClick={() =>
                dispatch(
                  getSearchFavoriteShop({
                    query,
                    pageSize: 15,
                    page: page + 4,
                  })
                )
              }
            >
              {page + 4}
            </div>
          )}
        </>
      )}

      <div
        className="page shadow-sm d-flex justify-content-center align-items-center mx-2"
        onClick={() =>
          dispatch(
            getSearchFavoriteShop({
              query,
              pageSize: 15,
              page: pages,
            })
          )
        }
      >
        E
      </div>
    </div>
  );
};

export default FavoriteShopPagination;
