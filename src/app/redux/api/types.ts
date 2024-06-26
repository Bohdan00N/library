import { TypeOf, object, string } from "zod";

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type RegisterRequest = TypeOf<typeof registerSchema>;

export type RegisterResponse = {
  email: string | null;
  id: string | null;
};

export type LoginRequest = TypeOf<typeof loginSchema>;

export type LoginResponse = {
  accessToken: string | null;
  refreshToken: string | null;
  sid: string | null;
  userData: {
    name: string | null;
    email: string | null;
    goingToRead: [
      {
        title: string | null;
        author: string | null;
        publishYear: number | null;
        pagesTotal: number | null;
        pagesFinished: number | null;
        _id: string | null;
        _v: number | null;
      }
    ];
    currentlyReading: [];
    finishedReading: [];
    id: string | null;
  };
};
export type refreshTokenRequest = {
  sid: string;
};
export type refreshTokenResponse = {
  newAccessToken: string;
  newRefreshToken: string;
  newSid: string;
};
export interface Book {
  title: string;
  author: string;
  publishYear: number;
  pagesTotal: number;
  pagesFinished: number;
  _id: string;
  __v: number;
}
export type userData = {
  name: string;
  email: string;
  goingToRead: Book[];
  currentlyReading: Book[];
  finishedReading: Book[];
};

export type addBookRequest = {
  title: string;
  author: string;
  publishYear: number;
  pagesTotal: number;
};

export type addBookResponse = {
  title: string ;
  author: string;
  publishYear: number;
  pagesTotal: number;
  pagesFinished: number;
  _id: string;
  __v: number;
};

export type bookReviewRequest = {
  rating: number;
  feedback: string;
};

export type bookReviewResponse = {
  title: string;
  author: string;
  publishYear: number;
  totalPages: number;
  pagesFinished: number;
  rating: number;
  feedback: string;
  _id: string;
  __v: number;
};
export type startPlanningRequest = {
  startDate: string;
  endDate: string;
  books: string[];
};
export type startPlanningResponse = {
  startDate: Date;
  endDate: Date;
  books: [
    {
      title: string  ;
      author: string  ;
      publishYear: number ;
      pagesTotal: number ;
      pagesFinished: number ;
      rating: number;
      feedback: string ;
      _id: string;
      __v: number;
    }
  ];
  duration: number ;
  pagesPerDay: number;
  stats: {
    time: string ;
    pagesCount: number ;
  };
  _id: string ;
};
export type addPlanningRequest = {
  pages: number;
};
interface Stat {
  time: string;
  pagesCount: number;
}
interface Planning {
  books: string[];
  _id: string;
  startDate: string;
  endDate: string;
  duration: number;
  pagesPerDay: number;
  stats: Stat[];
  __v: number;
}
export type addPlanningResponse = {
  book: Book;
  planning: Planning;
}

export type ChartData = {
  plan: number;
  fact: number;
};
export type addChartResult = { date: Date; pages: number };
export type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    extra: unknown;
    endpoint: string;
    type: "query" | "mutation";
    forced: boolean | undefined;
  }
) => Headers | void;
