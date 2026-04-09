import type { CreateMovieCommentDto, MovieCommentDto, MovieDto } from '../services/sdk';

export const movieData = [
  {
    _id: '69d6f9cc1b58b32711acb1d3',
    adult: false,
    originalTitle: 'The Avengers',
    overview:
      'When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!',
    releaseDate: '2012-04-25',
    title: 'The Avengers',
    posterUrl: 'https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d7',
    adult: false,
    originalTitle: 'Star Wars: The Last Jedi',
    overview:
      'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    releaseDate: '2017-12-13',
    title: 'Star Wars: The Last Jedi',
    posterUrl: 'https://image.tmdb.org/t/p/w780/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/bIUaCtWaRgd78SnoHJDI8TNf7Sd.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d5',
    adult: false,
    originalTitle: '劇場版 呪術廻戦「渋谷事変 特別編集版」×「死滅回游 先行上映」',
    overview:
      "A veil abruptly descends over the busy Shibuya area amid the bustling Halloween crowds, trapping countless civilians inside. Satoru Gojo, the strongest jujutsu sorcerer, steps into the chaos. But lying in wait are curse users and spirits scheming to seal him away. Yuji Itadori, accompanied by his classmates and other top-tier jujutsu sorcerers, enters the fray in an unprecedented clash of curses — the Shibuya Incident. In the aftermath, ten colonies across Japan are transformed into dens of curses in a plan orchestrated by Noritoshi Kamo. As the deadly Culling Game starts, Special Grade sorcerer Yuta Okkotsu is assigned to carry out Yuji's execution for his perceived crimes. A compilation movie of Shibuya Incident including the first two episodes of the Culling Games arc.",
    releaseDate: '2025-11-07',
    title: 'JUJUTSU KAISEN: Execution',
    posterUrl: 'https://image.tmdb.org/t/p/w780/v0s3dx6am0RzfsuK3KdEy8ZoCDs.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/gtKglOSEq3d4MgQE4VsrT1sRkd0.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d1',
    adult: false,
    originalTitle: "Lake Jesup: Bonecrusher's Revenge",
    overview:
      'In 2003, Lake Jesup became the stage for a real-life horror story, as a monstrous alligator escaped from captivity and began a reign of terror. As the body count rose, a desperate hunt ensued to stop the creature.',
    releaseDate: '2024-05-01',
    title: "Lake Jesup: Bonecrusher's Revenge",
    posterUrl: 'https://image.tmdb.org/t/p/w780/1Z1TgGXS1MD4DDfIkBNloM43vvj.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/3Vq8otoGevbhcZAKY2devVbPs6L.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d6',
    adult: false,
    originalTitle: '28 Years Later: The Bone Temple',
    overview:
      "Dr. Kelson finds himself in a shocking new relationship - with consequences that could change the world as they know it - and Spike's encounter with Jimmy Crystal becomes a nightmare he can't escape.",
    releaseDate: '2026-01-14',
    title: '28 Years Later: The Bone Temple',
    posterUrl: 'https://image.tmdb.org/t/p/w780/kK1BGkG3KAvWB0WMV1DfOx9yTMZ.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/hHDNOlATHhre4eZ7aYz5cdyJLik.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d4',
    adult: false,
    originalTitle: 'धुरंधर: द रिवेंज',
    overview:
      "As rival gangs, corrupt officials and a ruthless Major Iqbal close in, Hamza's mission for his country spirals into a bloody personal war where the line between patriot and monster disappears in the streets of Lyari.",
    releaseDate: '2026-03-18',
    title: 'Dhurandhar: The Revenge',
    posterUrl: 'https://image.tmdb.org/t/p/w780/ov8vrRLZGoXHpYjSY9Vpv1tHJX7.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/owQeDouUZ6wI6f1aTOYEFd511zn.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d9',
    adult: false,
    originalTitle: 'Hunting Season',
    overview:
      'When a reclusive survivalist and his daughter rescue a mysterious, wounded woman from a river, they become entangled in a deadly web of violence and revenge, forcing them to confront a brutal criminal to survive.',
    releaseDate: '2025-12-05',
    title: 'Hunting Season',
    posterUrl: 'https://image.tmdb.org/t/p/w780/cbryTyaWdqrKpQCw6K7zm2jrB5v.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/eJ0HooOOD1uzI39CfOQNWIiWKlJ.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d8',
    adult: false,
    originalTitle: 'The Rip',
    overview:
      'Trust frays when a team of Miami cops discovers millions in cash inside a run-down stash house, calling everyone — and everything — into question.',
    releaseDate: '2026-01-13',
    title: 'The Rip',
    posterUrl: 'https://image.tmdb.org/t/p/w780/eZo31Dhl5BQ6GfbMNf3oU0tUvPZ.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/3F2EXWF1thX0BdrVaKvnm6mAhqh.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d2',
    adult: false,
    originalTitle: 'The Devil Wears Prada',
    overview:
      'A young woman from the Midwest gets more than she bargained for when she moves to New York to become a writer and ends up as the assistant to the tyrannical, larger-than-life editor-in-chief of a major fashion magazine.',
    releaseDate: '2006-06-29',
    title: 'The Devil Wears Prada',
    posterUrl: 'https://image.tmdb.org/t/p/w780/8912AsVuS7Sj915apArUFbv6F9L.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/CpLAfXgSNeNRRbRzPrTuzKmIHO.jpg',
  },
  {
    _id: '69d6f9cc1b58b32711acb1d0',
    adult: false,
    originalTitle: 'xXx',
    overview:
      'Xander Cage is your standard adrenaline junkie with no fear and a lousy attitude. When the US Government "recruits" him to go on a mission, he\'s not exactly thrilled. His mission: to gather information on an organization that may just be planning the destruction of the world, led by the nihilistic Yorgi.',
    releaseDate: '2002-08-09',
    title: 'xXx',
    posterUrl: 'https://image.tmdb.org/t/p/w780/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w780/2OHa6ukEq3Hce7Pc2kvu8wkmMFY.jpg',
  },
] satisfies Array<MovieDto>;

const movieCommentData = new Map<string, MovieCommentDto[]>([
  [
    '69d6f9cc1b58b32711acb1d3',
    [
      {
        _id: 'c0000000-0000-4000-8000-000000000001',
        rating: 5,
        userId: 'u0000000-0000-4000-8000-000000000001',
        userName: 'Steph R.',
        movieId: '69d6f9cc1b58b32711acb1d3',
        content:
          "Seeing Cap, Iron Man, Thor and Hulk finally share the screen was worth every second. The Battle of New York still holds up.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000002',
        rating: 4,
        userId: 'u0000000-0000-4000-8000-000000000002',
        userName: 'Derek L.',
        movieId: '69d6f9cc1b58b32711acb1d3',
        content:
          "Whedon nails the team banter — 'puny god' is still one of the best MCU moments. Loki makes a genuinely fun villain here.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000003',
        rating: 3,
        userId: 'u0000000-0000-4000-8000-000000000003',
        userName: 'Priya K.',
        movieId: '69d6f9cc1b58b32711acb1d3',
        content:
          "Fun popcorn flick but the Chitauri are completely forgettable foot soldiers. The character dynamics carry it more than the plot.",
      },
    ],
  ],
  [
    '69d6f9cc1b58b32711acb1d7',
    [
      {
        _id: 'c0000000-0000-4000-8000-000000000004',
        rating: 4,
        userId: 'u0000000-0000-4000-8000-000000000004',
        userName: 'Marcus T.',
        movieId: '69d6f9cc1b58b32711acb1d7',
        content:
          "The throne room fight with Rey and Kylo is one of the best lightsaber sequences in the entire saga. Gorgeous choreography.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000005',
        rating: 2,
        userId: 'u0000000-0000-4000-8000-000000000005',
        userName: 'Jenna W.',
        movieId: '69d6f9cc1b58b32711acb1d7',
        content:
          "Luke Skywalker deserved a better send-off than this. The Canto Bight detour kills all the momentum of the main story.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000006',
        rating: 5,
        userId: 'u0000000-0000-4000-8000-000000000006',
        userName: 'Oliver B.',
        movieId: '69d6f9cc1b58b32711acb1d7',
        content:
          "The Holdo maneuver scene — silent hyperspace ram — genuinely took my breath away in the theater. Rian Johnson swung big and I loved it.",
      },
    ],
  ],
  [
    '69d6f9cc1b58b32711acb1d5',
    [
      {
        _id: 'c0000000-0000-4000-8000-000000000007',
        rating: 5,
        userId: 'u0000000-0000-4000-8000-000000000007',
        userName: 'Kenji M.',
        movieId: '69d6f9cc1b58b32711acb1d5',
        content:
          "Gojo vs Sukuna on the big screen with theater sound is an experience every JJK fan needs. MAPPA's animation during the Shibuya arc is insane.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000008',
        rating: 3,
        userId: 'u0000000-0000-4000-8000-000000000008',
        userName: 'Hana S.',
        movieId: '69d6f9cc1b58b32711acb1d5',
        content:
          "Great for a refresher before the Culling Game, but if you've already watched the anime there's not much new here. The two Culling Game episodes tacked on feel rushed.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000009',
        rating: 4,
        userId: 'u0000000-0000-4000-8000-000000000009',
        userName: 'Tariq A.',
        movieId: '69d6f9cc1b58b32711acb1d5',
        content:
          "Yuta showing up at the end gave me chills. Perfect hype builder for what's coming next in the series.",
      },
    ],
  ],
  [
    '69d6f9cc1b58b32711acb1d1',
    [
      {
        _id: 'c0000000-0000-4000-8000-000000000010',
        rating: 2,
        userId: 'u0000000-0000-4000-8000-000000000010',
        userName: 'Brandi F.',
        movieId: '69d6f9cc1b58b32711acb1d1',
        content:
          "Bonecrusher the alligator is a fun B-movie monster but the CGI is rough and the pacing drags in the middle. Watch it with friends and snacks.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000011',
        rating: 4,
        userId: 'u0000000-0000-4000-8000-000000000011',
        userName: 'Wes H.',
        movieId: '69d6f9cc1b58b32711acb1d1',
        content:
          "Exactly the kind of schlocky Florida creature feature I signed up for. The swamp kill scenes are gloriously over the top.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000012',
        rating: 1,
        userId: 'u0000000-0000-4000-8000-000000000012',
        userName: 'Rachel Y.',
        movieId: '69d6f9cc1b58b32711acb1d1',
        content:
          "Claims to be based on the real 2003 Lake Jesup incident but it's barely connected. Felt misled by the marketing.",
      },
    ],
  ],
  [
    '69d6f9cc1b58b32711acb1d6',
    [
      {
        _id: 'c0000000-0000-4000-8000-000000000013',
        rating: 5,
        userId: 'u0000000-0000-4000-8000-000000000013',
        userName: 'Gavin P.',
        movieId: '69d6f9cc1b58b32711acb1d6',
        content:
          "Danny Boyle and Alex Garland back in form. The Bone Temple imagery is going to haunt me for weeks — this is bleak, beautiful horror.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000014',
        rating: 4,
        userId: 'u0000000-0000-4000-8000-000000000014',
        userName: 'Leona C.',
        movieId: '69d6f9cc1b58b32711acb1d6',
        content:
          "Ralph Fiennes as Dr. Kelson steals every scene he's in. Spike's arc with Jimmy Crystal is genuinely disturbing in the best way.",
      },
      {
        _id: 'c0000000-0000-4000-8000-000000000015',
        rating: 3,
        userId: 'u0000000-0000-4000-8000-000000000015',
        userName: 'Ahmed R.',
        movieId: '69d6f9cc1b58b32711acb1d6',
        content:
          "A solid middle chapter but it very much feels like setup for part three. Ends on a cliffhanger that'll frustrate anyone expecting resolution.",
      },
    ],
  ],
]);

export const getMovieComments = (movieId: string): MovieCommentDto[] =>
  movieCommentData.get(movieId) || [];

const fakeUserId = crypto.randomUUID();

export const addMovieComment = (createData: CreateMovieCommentDto): MovieCommentDto => {
  const comment: MovieCommentDto = {
    ...createData,
    _id: crypto.randomUUID(),
    userId: fakeUserId,
    userName: 'Malcolm Local',
  };

  const comments = movieCommentData.get(createData.movieId) || [];
  comments.push(comment);

  movieCommentData.set(createData.movieId, comments);

  return comment;
};

export const deleteMovieComment = (commentId: string): MovieCommentDto | undefined => {
  const movieCommentSets = movieCommentData.values();

  for (const comments of movieCommentSets) {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment._id === commentId) {
        const [deleted] = comments.splice(i, 1);
        return deleted;
      }
    }
  }

  return undefined;
};
