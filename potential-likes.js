'use strict';

function SocialNetworkQueries({ fetchCurrentUser }) {
  return Object.freeze({ findPotentialLikes });

  async function findPotentialLikes({ minimalScore } = {}) {
    try {
      var {
        friends,
        likes: { books: userBooks },
      } = await fetchCurrentUser();
    } catch (e) {
      return Promise.resolve({ books: [] });
    }

    var allFriendBooks = [];
    var books = [];

    if (friends) {
      for (const {
        likes: { books: currentFriendBooks },
      } of friends) {
        if (currentFriendBooks.length > 0) {
          allFriendBooks = allFriendBooks.concat(...currentFriendBooks);
        }
      }
    }

    var rank = new Map();
    for (const book of allFriendBooks) {
      const value = friends.length ** -1;
      if (!rank.has(book)) {
        rank.set(book, value);
      } else {
        rank.set(book, rank.get(book) + value);
      }
    }

    for (const [k, v] of rank) {
      if (v < minimalScore) {
        rank.delete(k);
      }
    }

    order_by_alpha_and_popularity: {
      const order = Array.from(rank);
      order.sort((a, b) => {
        const [keyA, valueA] = a;
        const [keyB, valueB] = b;
        if (valueA == valueB) {
          return keyA < keyB ? -1 : 1;
        }
        return valueB - valueA;
      });

      books = order.map((b) => b[0]);
    }

    remove_user_books: {
      books = books.filter((x) => !userBooks.includes(x));
    }

    return Promise.resolve({ books });
  }
}

export { SocialNetworkQueries };
