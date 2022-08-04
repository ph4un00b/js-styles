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
      const score = friends.length ** -1;
      if (!rank.has(book)) {
        rank.set(book, score);
      } else {
        rank.set(book, rank.get(book) + score);
      }
    }

    for (const [bookTitle, score] of rank) {
      if (score < minimalScore) {
        rank.delete(bookTitle);
      }
    }

    order_by_alpha_and_popularity: {
      const order = Array.from(rank);
      order.sort((a, b) => {
        const [titleA, scoreA] = a;
        const [titleB, scoreB] = b;
        if (scoreA == scoreB) {
          return titleA < titleB ? -1 : 1;
        }
        return scoreB - scoreA;
      });

      books = order.map((bookTuple) => bookTuple[0]);
    }

    remove_user_books: {
      books = books.filter((item) => !userBooks.includes(item));
    }

    return Promise.resolve({ books });
  }
}

export { SocialNetworkQueries };
