import { Movie } from '@/types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const mockMovies: Movie[] = [
  {
    id: 1,
    slug: 'inception',
    title: '盗梦空间',
    originalTitle: 'Inception',
    year: 2010,
    description: '道姆·柯布是一位经验丰富的盗梦者，他在这个危险的梦境世界中是最好的，但他也因此失去了一切。现在柯布有机会赎回，但他必须完成一个不可能的任务：不是盗取想法，而是植入想法。如果他们成功，这将是完美的犯罪。但是没有任何计划或专业知识可以让团队为即将面对的危险敌人做好准备。一个只有柯布能够预见的敌人。',
    posterUrl: `${IMAGE_BASE_URL}/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg`,
    coverUrl: `${IMAGE_BASE_URL}/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`,
    trailerUrl: '/videos/inception-trailer.mp4',
    rating: 9.3,
    duration: 148,
    directors: ['克里斯托弗·诺兰'],
    actors: ['莱昂纳多·迪卡普里奥', '约瑟夫·高登-莱维特', '艾伦·佩吉', '渡边谦', '汤姆·哈迪'],
    genres: ['科幻', '动作', '冒险', '悬疑'],
    region: '美国',
    videoSources: [
      {
        quality: '1080p',
        url: '/videos/inception-1080p.mp4',
        label: '1080P 全高清',
        bitrate: 5000
      },
      {
        quality: '720p',
        url: '/videos/inception-720p.mp4',
        label: '720P 高清',
        bitrate: 2500
      },
      {
        quality: '480p',
        url: '/videos/inception-480p.mp4',
        label: '480P 清晰',
        bitrate: 1000
      }
    ],
    subtitles: [
      {
        id: 'zh',
        language: 'zh',
        label: '中文',
        url: '/api/subtitles/1/zh.vtt'
      },
      {
        id: 'en',
        language: 'en',
        label: 'English',
        url: '/api/subtitles/1/en.vtt'
      }
    ]
  },
  {
    id: 2,
    slug: 'the-shawshank-redemption',
    title: '肖申克的救赎',
    originalTitle: 'The Shawshank Redemption',
    year: 1994,
    description: '银行家安迪因被误判杀害妻子和她的情人而被判终身监禁，进入肖申克监狱。在那里，他遇到了能弄到任何东西的红，两人成为了好朋友。安迪凭借自己的金融知识，帮助监狱长和狱警做账，获得了他们的信任。但他始终没有放弃希望，利用自己的智慧和坚韧，谋划着一场惊天大逃亡。',
    posterUrl: '/images/movies/shawshank-redemption-poster.jpg',
    coverUrl: '/images/movies/shawshank-redemption-cover.jpg',
    trailerUrl: '/videos/shawshank-redemption-trailer.mp4',
    rating: 9.7,
    duration: 142,
    directors: ['弗兰克·德拉邦特'],
    actors: ['蒂姆·罗宾斯', '摩根·弗里曼', '鲍勃·冈顿', '威廉姆·赛德勒'],
    genres: ['剧情', '犯罪'],
    region: '美国',
    videoSources: [
      {
        quality: '1080p',
        url: '/videos/shawshank-redemption-1080p.mp4',
        label: '1080P 全高清',
        bitrate: 5000
      },
      {
        quality: '720p',
        url: '/videos/shawshank-redemption-720p.mp4',
        label: '720P 高清',
        bitrate: 2500
      },
      {
        quality: '480p',
        url: '/videos/shawshank-redemption-480p.mp4',
        label: '480P 清晰',
        bitrate: 1000
      }
    ],
    subtitles: [
      {
        id: 'zh',
        language: 'zh',
        label: '中文',
        url: '/api/subtitles/2/zh.vtt'
      },
      {
        id: 'en',
        language: 'en',
        label: 'English',
        url: '/api/subtitles/2/en.vtt'
      }
    ]
  },
  {
    id: 3,
    slug: 'interstellar',
    title: '星际穿越',
    originalTitle: 'Interstellar',
    year: 2014,
    description: '在不久的将来，地球面临着严重的环境危机。前NASA宇航员库珀接受一项秘密任务，带领一组研究人员通过虫洞进行星际旅行，寻找可以延续人类文明的新家园。在这场跨越时空的冒险中，他不得不面对错过女儿成长的痛苦，以及关于爱、时间和人性的终极思考。',
    posterUrl: '/images/movies/interstellar-poster.jpg',
    coverUrl: '/images/movies/interstellar-cover.jpg',
    trailerUrl: '/videos/interstellar-trailer.mp4',
    rating: 9.4,
    duration: 169,
    directors: ['克里斯托弗·诺兰'],
    actors: ['马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦', '麦肯吉·弗依'],
    genres: ['科幻', '冒险', '剧情'],
    region: '美国',
    videoSources: [
      {
        quality: '1080p',
        url: '/videos/interstellar-1080p.mp4',
        label: '1080P 全高清',
        bitrate: 5000
      },
      {
        quality: '720p',
        url: '/videos/interstellar-720p.mp4',
        label: '720P 高清',
        bitrate: 2500
      },
      {
        quality: '480p',
        url: '/videos/interstellar-480p.mp4',
        label: '480P 清晰',
        bitrate: 1000
      }
    ],
    subtitles: [
      {
        id: 'zh',
        language: 'zh',
        label: '中文',
        url: '/api/subtitles/3/zh.vtt'
      },
      {
        id: 'en',
        language: 'en',
        label: 'English',
        url: '/api/subtitles/3/en.vtt'
      }
    ]
  },
  {
    id: 4,
    slug: 'the-dark-knight',
    title: '蝙蝠侠：黑暗骑士',
    originalTitle: 'The Dark Knight',
    year: 2008,
    description: '在蝙蝠侠和吉姆·戈登警长的努力下，哥谭市已经有了很大改善。但是一个充满混乱和破坏欲望的新罪犯小丑的出现，让这座城市再次陷入恐慌。为了对抗这个前所未有的威胁，蝙蝠侠必须面对自己内心的恐惧，并作出终极抉择。',
    posterUrl: '/images/movies/dark-knight-poster.jpg',
    coverUrl: '/images/movies/dark-knight-cover.jpg',
    trailerUrl: '/videos/dark-knight-trailer.mp4',
    rating: 9.2,
    duration: 152,
    directors: ['克里斯托弗·诺兰'],
    actors: ['克里斯蒂安·贝尔', '希斯·莱杰', '艾伦·艾克哈特', '迈克尔·凯恩'],
    genres: ['动作', '犯罪', '剧情', '惊悚'],
    region: '美国',
    videoSources: [
      {
        quality: '1080p',
        url: '/videos/dark-knight-1080p.mp4',
        label: '1080P 全高清',
        bitrate: 5000
      },
      {
        quality: '720p',
        url: '/videos/dark-knight-720p.mp4',
        label: '720P 高清',
        bitrate: 2500
      },
      {
        quality: '480p',
        url: '/videos/dark-knight-480p.mp4',
        label: '480P 清晰',
        bitrate: 1000
      }
    ],
    subtitles: [
      {
        id: 'zh',
        language: 'zh',
        label: '中文',
        url: '/api/subtitles/4/zh.vtt'
      },
      {
        id: 'en',
        language: 'en',
        label: 'English',
        url: '/api/subtitles/4/en.vtt'
      }
    ]
  },
  {
    id: 5,
    slug: 'pulp-fiction',
    title: '低俗小说',
    originalTitle: 'Pulp Fiction',
    year: 1994,
    description: '影片由三个相互关联的故事组成：两个杀手的一天、一个拳击手的黄金手表、黑帮老大的妻子。通过非线性叙事手法，昆汀·塔伦蒂诺展现了一个充满暴力、幽默和哲理的犯罪世界。',
    posterUrl: '/images/movies/pulp-fiction-poster.jpg',
    coverUrl: '/images/movies/pulp-fiction-cover.jpg',
    trailerUrl: '/videos/pulp-fiction-trailer.mp4',
    rating: 9.1,
    duration: 154,
    directors: ['昆汀·塔伦蒂诺'],
    actors: ['约翰·特拉沃尔塔', '乌玛·瑟曼', '塞缪尔·杰克逊', '布鲁斯·威利斯'],
    genres: ['犯罪', '剧情'],
    region: '美国',
    videoSources: [
      {
        quality: '1080p',
        url: '/videos/pulp-fiction-1080p.mp4',
        label: '1080P 全高清',
        bitrate: 5000
      },
      {
        quality: '720p',
        url: '/videos/pulp-fiction-720p.mp4',
        label: '720P 高清',
        bitrate: 2500
      },
      {
        quality: '480p',
        url: '/videos/pulp-fiction-480p.mp4',
        label: '480P 清晰',
        bitrate: 1000
      }
    ],
    subtitles: [
      {
        id: 'zh',
        language: 'zh',
        label: '中文',
        url: '/api/subtitles/5/zh.vtt'
      },
      {
        id: 'en',
        language: 'en',
        label: 'English',
        url: '/api/subtitles/5/en.vtt'
      }
    ]
  }
]; 