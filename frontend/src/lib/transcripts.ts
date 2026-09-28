export interface TranscriptWord {
  text: string;
  startSec: number;
  endSec: number;
}

export interface TranscriptSegment {
  id: string;
  title: string;
  startSec: number;
  endSec: number;
  text: string;
  words: TranscriptWord[];
}

// Exact transcript from YouTube video https://youtu.be/3s0lFtUrhSQ (SQL Tutorial)
export const SQL_VIDEO_TRANSCRIPT: TranscriptSegment[] = [
  {
    "id": "sql-seg-1",
    "title": "1. SQL stands for Structured...",
    "startSec": 0,
    "endSec": 5,
    "text": "SQL stands for Structured Query Language and is  used to communicate with databases, allowing us",
    "words": [
      {
        "text": "SQL",
        "startSec": 0,
        "endSec": 0.28
      },
      {
        "text": "stands",
        "startSec": 0.33,
        "endSec": 0.62
      },
      {
        "text": "for",
        "startSec": 0.67,
        "endSec": 0.95
      },
      {
        "text": "Structured",
        "startSec": 1,
        "endSec": 1.28
      },
      {
        "text": "Query",
        "startSec": 1.33,
        "endSec": 1.62
      },
      {
        "text": "Language",
        "startSec": 1.67,
        "endSec": 1.95
      },
      {
        "text": "and",
        "startSec": 2,
        "endSec": 2.28
      },
      {
        "text": "is",
        "startSec": 2.33,
        "endSec": 2.62
      },
      {
        "text": "used",
        "startSec": 2.67,
        "endSec": 2.95
      },
      {
        "text": "to",
        "startSec": 3,
        "endSec": 3.28
      },
      {
        "text": "communicate",
        "startSec": 3.33,
        "endSec": 3.62
      },
      {
        "text": "with",
        "startSec": 3.67,
        "endSec": 3.95
      },
      {
        "text": "databases,",
        "startSec": 4,
        "endSec": 4.28
      },
      {
        "text": "allowing",
        "startSec": 4.33,
        "endSec": 4.62
      },
      {
        "text": "us",
        "startSec": 4.67,
        "endSec": 4.95
      }
    ]
  },
  {
    "id": "sql-seg-2",
    "title": "2. to retrieve, insert, update,...",
    "startSec": 5,
    "endSec": 11,
    "text": "to retrieve, insert, update, and delete data from  a database. It uses simple English-like commands,",
    "words": [
      {
        "text": "to",
        "startSec": 5,
        "endSec": 5.35
      },
      {
        "text": "retrieve,",
        "startSec": 5.4,
        "endSec": 5.75
      },
      {
        "text": "insert,",
        "startSec": 5.8,
        "endSec": 6.15
      },
      {
        "text": "update,",
        "startSec": 6.2,
        "endSec": 6.55
      },
      {
        "text": "and",
        "startSec": 6.6,
        "endSec": 6.95
      },
      {
        "text": "delete",
        "startSec": 7,
        "endSec": 7.35
      },
      {
        "text": "data",
        "startSec": 7.4,
        "endSec": 7.75
      },
      {
        "text": "from",
        "startSec": 7.8,
        "endSec": 8.15
      },
      {
        "text": "a",
        "startSec": 8.2,
        "endSec": 8.55
      },
      {
        "text": "database.",
        "startSec": 8.6,
        "endSec": 8.95
      },
      {
        "text": "It",
        "startSec": 9,
        "endSec": 9.35
      },
      {
        "text": "uses",
        "startSec": 9.4,
        "endSec": 9.75
      },
      {
        "text": "simple",
        "startSec": 9.8,
        "endSec": 10.15
      },
      {
        "text": "English-like",
        "startSec": 10.2,
        "endSec": 10.55
      },
      {
        "text": "commands,",
        "startSec": 10.6,
        "endSec": 10.95
      }
    ]
  },
  {
    "id": "sql-seg-3",
    "title": "3. making it easy to...",
    "startSec": 11,
    "endSec": 18,
    "text": "making it easy to learn and use. It's also  widely used in many applications, from websites",
    "words": [
      {
        "text": "making",
        "startSec": 11,
        "endSec": 11.39
      },
      {
        "text": "it",
        "startSec": 11.44,
        "endSec": 11.82
      },
      {
        "text": "easy",
        "startSec": 11.88,
        "endSec": 12.26
      },
      {
        "text": "to",
        "startSec": 12.31,
        "endSec": 12.7
      },
      {
        "text": "learn",
        "startSec": 12.75,
        "endSec": 13.14
      },
      {
        "text": "and",
        "startSec": 13.19,
        "endSec": 13.57
      },
      {
        "text": "use.",
        "startSec": 13.63,
        "endSec": 14.01
      },
      {
        "text": "It's",
        "startSec": 14.06,
        "endSec": 14.45
      },
      {
        "text": "also",
        "startSec": 14.5,
        "endSec": 14.89
      },
      {
        "text": "widely",
        "startSec": 14.94,
        "endSec": 15.32
      },
      {
        "text": "used",
        "startSec": 15.38,
        "endSec": 15.76
      },
      {
        "text": "in",
        "startSec": 15.81,
        "endSec": 16.2
      },
      {
        "text": "many",
        "startSec": 16.25,
        "endSec": 16.64
      },
      {
        "text": "applications,",
        "startSec": 16.69,
        "endSec": 17.07
      },
      {
        "text": "from",
        "startSec": 17.13,
        "endSec": 17.51
      },
      {
        "text": "websites",
        "startSec": 17.56,
        "endSec": 17.95
      }
    ]
  },
  {
    "id": "sql-seg-4",
    "title": "4. to mobile apps. In...",
    "startSec": 18,
    "endSec": 23,
    "text": "to mobile apps. In this video, I’ll give you a  beginner-level understanding of SQL which will",
    "words": [
      {
        "text": "to",
        "startSec": 18,
        "endSec": 18.26
      },
      {
        "text": "mobile",
        "startSec": 18.31,
        "endSec": 18.57
      },
      {
        "text": "apps.",
        "startSec": 18.63,
        "endSec": 18.89
      },
      {
        "text": "In",
        "startSec": 18.94,
        "endSec": 19.2
      },
      {
        "text": "this",
        "startSec": 19.25,
        "endSec": 19.51
      },
      {
        "text": "video,",
        "startSec": 19.56,
        "endSec": 19.82
      },
      {
        "text": "I’ll",
        "startSec": 19.88,
        "endSec": 20.14
      },
      {
        "text": "give",
        "startSec": 20.19,
        "endSec": 20.45
      },
      {
        "text": "you",
        "startSec": 20.5,
        "endSec": 20.76
      },
      {
        "text": "a",
        "startSec": 20.81,
        "endSec": 21.07
      },
      {
        "text": "beginner-level",
        "startSec": 21.13,
        "endSec": 21.39
      },
      {
        "text": "understanding",
        "startSec": 21.44,
        "endSec": 21.7
      },
      {
        "text": "of",
        "startSec": 21.75,
        "endSec": 22.01
      },
      {
        "text": "SQL",
        "startSec": 22.06,
        "endSec": 22.32
      },
      {
        "text": "which",
        "startSec": 22.38,
        "endSec": 22.64
      },
      {
        "text": "will",
        "startSec": 22.69,
        "endSec": 22.95
      }
    ]
  },
  {
    "id": "sql-seg-5",
    "title": "5. What is DBMS: help you handle and...",
    "startSec": 23,
    "endSec": 30,
    "text": "help you handle and manage data efficiently. So,  let's get started! Firstly, we need to understand",
    "words": [
      {
        "text": "help",
        "startSec": 23,
        "endSec": 23.39
      },
      {
        "text": "you",
        "startSec": 23.44,
        "endSec": 23.82
      },
      {
        "text": "handle",
        "startSec": 23.88,
        "endSec": 24.26
      },
      {
        "text": "and",
        "startSec": 24.31,
        "endSec": 24.7
      },
      {
        "text": "manage",
        "startSec": 24.75,
        "endSec": 25.14
      },
      {
        "text": "data",
        "startSec": 25.19,
        "endSec": 25.57
      },
      {
        "text": "efficiently.",
        "startSec": 25.63,
        "endSec": 26.01
      },
      {
        "text": "So,",
        "startSec": 26.06,
        "endSec": 26.45
      },
      {
        "text": "let's",
        "startSec": 26.5,
        "endSec": 26.89
      },
      {
        "text": "get",
        "startSec": 26.94,
        "endSec": 27.32
      },
      {
        "text": "started!",
        "startSec": 27.38,
        "endSec": 27.76
      },
      {
        "text": "Firstly,",
        "startSec": 27.81,
        "endSec": 28.2
      },
      {
        "text": "we",
        "startSec": 28.25,
        "endSec": 28.64
      },
      {
        "text": "need",
        "startSec": 28.69,
        "endSec": 29.07
      },
      {
        "text": "to",
        "startSec": 29.13,
        "endSec": 29.51
      },
      {
        "text": "understand",
        "startSec": 29.56,
        "endSec": 29.95
      }
    ]
  },
  {
    "id": "sql-seg-6",
    "title": "6. what is a Database...",
    "startSec": 30,
    "endSec": 36,
    "text": "what is a Database Management System (or DBMS):  Well, fundamentally, it is a software that enables",
    "words": [
      {
        "text": "what",
        "startSec": 30,
        "endSec": 30.32
      },
      {
        "text": "is",
        "startSec": 30.38,
        "endSec": 30.7
      },
      {
        "text": "a",
        "startSec": 30.75,
        "endSec": 31.07
      },
      {
        "text": "Database",
        "startSec": 31.13,
        "endSec": 31.45
      },
      {
        "text": "Management",
        "startSec": 31.5,
        "endSec": 31.82
      },
      {
        "text": "System",
        "startSec": 31.88,
        "endSec": 32.2
      },
      {
        "text": "(or",
        "startSec": 32.25,
        "endSec": 32.58
      },
      {
        "text": "DBMS):",
        "startSec": 32.63,
        "endSec": 32.95
      },
      {
        "text": "Well,",
        "startSec": 33,
        "endSec": 33.33
      },
      {
        "text": "fundamentally,",
        "startSec": 33.38,
        "endSec": 33.7
      },
      {
        "text": "it",
        "startSec": 33.75,
        "endSec": 34.08
      },
      {
        "text": "is",
        "startSec": 34.13,
        "endSec": 34.45
      },
      {
        "text": "a",
        "startSec": 34.5,
        "endSec": 34.83
      },
      {
        "text": "software",
        "startSec": 34.88,
        "endSec": 35.2
      },
      {
        "text": "that",
        "startSec": 35.25,
        "endSec": 35.58
      },
      {
        "text": "enables",
        "startSec": 35.63,
        "endSec": 35.95
      }
    ]
  },
  {
    "id": "sql-seg-7",
    "title": "7. users to interact with...",
    "startSec": 36,
    "endSec": 41,
    "text": "users to interact with databases. It provides an  interface to define, create, and manage databases.",
    "words": [
      {
        "text": "users",
        "startSec": 36,
        "endSec": 36.28
      },
      {
        "text": "to",
        "startSec": 36.33,
        "endSec": 36.62
      },
      {
        "text": "interact",
        "startSec": 36.67,
        "endSec": 36.95
      },
      {
        "text": "with",
        "startSec": 37,
        "endSec": 37.28
      },
      {
        "text": "databases.",
        "startSec": 37.33,
        "endSec": 37.62
      },
      {
        "text": "It",
        "startSec": 37.67,
        "endSec": 37.95
      },
      {
        "text": "provides",
        "startSec": 38,
        "endSec": 38.28
      },
      {
        "text": "an",
        "startSec": 38.33,
        "endSec": 38.62
      },
      {
        "text": "interface",
        "startSec": 38.67,
        "endSec": 38.95
      },
      {
        "text": "to",
        "startSec": 39,
        "endSec": 39.28
      },
      {
        "text": "define,",
        "startSec": 39.33,
        "endSec": 39.62
      },
      {
        "text": "create,",
        "startSec": 39.67,
        "endSec": 39.95
      },
      {
        "text": "and",
        "startSec": 40,
        "endSec": 40.28
      },
      {
        "text": "manage",
        "startSec": 40.33,
        "endSec": 40.62
      },
      {
        "text": "databases.",
        "startSec": 40.67,
        "endSec": 40.95
      }
    ]
  },
  {
    "id": "sql-seg-8",
    "title": "8. Popular DBMSs include MySQL,...",
    "startSec": 41,
    "endSec": 50,
    "text": "Popular DBMSs include MySQL, PostgreSQL, Oracle,  SQL Server, and SQLite, etc. a specific type of",
    "words": [
      {
        "text": "Popular",
        "startSec": 41,
        "endSec": 41.55
      },
      {
        "text": "DBMSs",
        "startSec": 41.6,
        "endSec": 42.15
      },
      {
        "text": "include",
        "startSec": 42.2,
        "endSec": 42.75
      },
      {
        "text": "MySQL,",
        "startSec": 42.8,
        "endSec": 43.35
      },
      {
        "text": "PostgreSQL,",
        "startSec": 43.4,
        "endSec": 43.95
      },
      {
        "text": "Oracle,",
        "startSec": 44,
        "endSec": 44.55
      },
      {
        "text": "SQL",
        "startSec": 44.6,
        "endSec": 45.15
      },
      {
        "text": "Server,",
        "startSec": 45.2,
        "endSec": 45.75
      },
      {
        "text": "and",
        "startSec": 45.8,
        "endSec": 46.35
      },
      {
        "text": "SQLite,",
        "startSec": 46.4,
        "endSec": 46.95
      },
      {
        "text": "etc.",
        "startSec": 47,
        "endSec": 47.55
      },
      {
        "text": "a",
        "startSec": 47.6,
        "endSec": 48.15
      },
      {
        "text": "specific",
        "startSec": 48.2,
        "endSec": 48.75
      },
      {
        "text": "type",
        "startSec": 48.8,
        "endSec": 49.35
      },
      {
        "text": "of",
        "startSec": 49.4,
        "endSec": 49.95
      }
    ]
  },
  {
    "id": "sql-seg-9",
    "title": "9. database managed by DBMS...",
    "startSec": 50,
    "endSec": 57,
    "text": "database managed by DBMS is a Relational Database,  which organizes data into tables with rows and",
    "words": [
      {
        "text": "database",
        "startSec": 50,
        "endSec": 50.39
      },
      {
        "text": "managed",
        "startSec": 50.44,
        "endSec": 50.83
      },
      {
        "text": "by",
        "startSec": 50.88,
        "endSec": 51.26
      },
      {
        "text": "DBMS",
        "startSec": 51.31,
        "endSec": 51.7
      },
      {
        "text": "is",
        "startSec": 51.75,
        "endSec": 52.14
      },
      {
        "text": "a",
        "startSec": 52.19,
        "endSec": 52.58
      },
      {
        "text": "Relational",
        "startSec": 52.63,
        "endSec": 53.01
      },
      {
        "text": "Database,",
        "startSec": 53.06,
        "endSec": 53.45
      },
      {
        "text": "which",
        "startSec": 53.5,
        "endSec": 53.89
      },
      {
        "text": "organizes",
        "startSec": 53.94,
        "endSec": 54.33
      },
      {
        "text": "data",
        "startSec": 54.38,
        "endSec": 54.76
      },
      {
        "text": "into",
        "startSec": 54.81,
        "endSec": 55.2
      },
      {
        "text": "tables",
        "startSec": 55.25,
        "endSec": 55.64
      },
      {
        "text": "with",
        "startSec": 55.69,
        "endSec": 56.08
      },
      {
        "text": "rows",
        "startSec": 56.13,
        "endSec": 56.51
      },
      {
        "text": "and",
        "startSec": 56.56,
        "endSec": 56.95
      }
    ]
  },
  {
    "id": "sql-seg-10",
    "title": "10. columns. Here, each table...",
    "startSec": 57,
    "endSec": 63,
    "text": "columns. Here, each table represents an entity,  and each row represents a record or an instance",
    "words": [
      {
        "text": "columns.",
        "startSec": 57,
        "endSec": 57.33
      },
      {
        "text": "Here,",
        "startSec": 57.38,
        "endSec": 57.7
      },
      {
        "text": "each",
        "startSec": 57.75,
        "endSec": 58.08
      },
      {
        "text": "table",
        "startSec": 58.13,
        "endSec": 58.45
      },
      {
        "text": "represents",
        "startSec": 58.5,
        "endSec": 58.83
      },
      {
        "text": "an",
        "startSec": 58.88,
        "endSec": 59.2
      },
      {
        "text": "entity,",
        "startSec": 59.25,
        "endSec": 59.58
      },
      {
        "text": "and",
        "startSec": 59.63,
        "endSec": 59.95
      },
      {
        "text": "each",
        "startSec": 60,
        "endSec": 60.33
      },
      {
        "text": "row",
        "startSec": 60.38,
        "endSec": 60.7
      },
      {
        "text": "represents",
        "startSec": 60.75,
        "endSec": 61.08
      },
      {
        "text": "a",
        "startSec": 61.13,
        "endSec": 61.45
      },
      {
        "text": "record",
        "startSec": 61.5,
        "endSec": 61.83
      },
      {
        "text": "or",
        "startSec": 61.88,
        "endSec": 62.2
      },
      {
        "text": "an",
        "startSec": 62.25,
        "endSec": 62.58
      },
      {
        "text": "instance",
        "startSec": 62.63,
        "endSec": 62.95
      }
    ]
  },
  {
    "id": "sql-seg-11",
    "title": "11. SQL Queries: of that entity. Similarly,...",
    "startSec": 63,
    "endSec": 74,
    "text": "of that entity. Similarly, columns contain  attributes or properties of that entity.",
    "words": [
      {
        "text": "of",
        "startSec": 63,
        "endSec": 63.87
      },
      {
        "text": "that",
        "startSec": 63.92,
        "endSec": 64.78
      },
      {
        "text": "entity.",
        "startSec": 64.83,
        "endSec": 65.7
      },
      {
        "text": "Similarly,",
        "startSec": 65.75,
        "endSec": 66.62
      },
      {
        "text": "columns",
        "startSec": 66.67,
        "endSec": 67.53
      },
      {
        "text": "contain",
        "startSec": 67.58,
        "endSec": 68.45
      },
      {
        "text": "attributes",
        "startSec": 68.5,
        "endSec": 69.37
      },
      {
        "text": "or",
        "startSec": 69.42,
        "endSec": 70.28
      },
      {
        "text": "properties",
        "startSec": 70.33,
        "endSec": 71.2
      },
      {
        "text": "of",
        "startSec": 71.25,
        "endSec": 72.12
      },
      {
        "text": "that",
        "startSec": 72.17,
        "endSec": 73.03
      },
      {
        "text": "entity.",
        "startSec": 73.08,
        "endSec": 73.95
      }
    ]
  },
  {
    "id": "sql-seg-12",
    "title": "12. There’s something called as...",
    "startSec": 74,
    "endSec": 77,
    "text": "There’s something called as CRUD  Operations which stand for Create, Read,",
    "words": [
      {
        "text": "There’s",
        "startSec": 74,
        "endSec": 74.22
      },
      {
        "text": "something",
        "startSec": 74.27,
        "endSec": 74.5
      },
      {
        "text": "called",
        "startSec": 74.55,
        "endSec": 74.77
      },
      {
        "text": "as",
        "startSec": 74.82,
        "endSec": 75.04
      },
      {
        "text": "CRUD",
        "startSec": 75.09,
        "endSec": 75.31
      },
      {
        "text": "Operations",
        "startSec": 75.36,
        "endSec": 75.59
      },
      {
        "text": "which",
        "startSec": 75.64,
        "endSec": 75.86
      },
      {
        "text": "stand",
        "startSec": 75.91,
        "endSec": 76.13
      },
      {
        "text": "for",
        "startSec": 76.18,
        "endSec": 76.4
      },
      {
        "text": "Create,",
        "startSec": 76.45,
        "endSec": 76.68
      },
      {
        "text": "Read,",
        "startSec": 76.73,
        "endSec": 76.95
      }
    ]
  },
  {
    "id": "sql-seg-13",
    "title": "13. Update, and Delete, and...",
    "startSec": 77,
    "endSec": 83,
    "text": "Update, and Delete, and are the fundamental  operations for managing data in a database.",
    "words": [
      {
        "text": "Update,",
        "startSec": 77,
        "endSec": 77.38
      },
      {
        "text": "and",
        "startSec": 77.43,
        "endSec": 77.81
      },
      {
        "text": "Delete,",
        "startSec": 77.86,
        "endSec": 78.24
      },
      {
        "text": "and",
        "startSec": 78.29,
        "endSec": 78.66
      },
      {
        "text": "are",
        "startSec": 78.71,
        "endSec": 79.09
      },
      {
        "text": "the",
        "startSec": 79.14,
        "endSec": 79.52
      },
      {
        "text": "fundamental",
        "startSec": 79.57,
        "endSec": 79.95
      },
      {
        "text": "operations",
        "startSec": 80,
        "endSec": 80.38
      },
      {
        "text": "for",
        "startSec": 80.43,
        "endSec": 80.81
      },
      {
        "text": "managing",
        "startSec": 80.86,
        "endSec": 81.24
      },
      {
        "text": "data",
        "startSec": 81.29,
        "endSec": 81.66
      },
      {
        "text": "in",
        "startSec": 81.71,
        "endSec": 82.09
      },
      {
        "text": "a",
        "startSec": 82.14,
        "endSec": 82.52
      },
      {
        "text": "database.",
        "startSec": 82.57,
        "endSec": 82.95
      }
    ]
  },
  {
    "id": "sql-seg-14",
    "title": "14. Create is used to...",
    "startSec": 83,
    "endSec": 88,
    "text": "Create is used to insert new records into a  table, Read is used to retrieve data from a table,",
    "words": [
      {
        "text": "Create",
        "startSec": 83,
        "endSec": 83.21
      },
      {
        "text": "is",
        "startSec": 83.26,
        "endSec": 83.48
      },
      {
        "text": "used",
        "startSec": 83.53,
        "endSec": 83.74
      },
      {
        "text": "to",
        "startSec": 83.79,
        "endSec": 84
      },
      {
        "text": "insert",
        "startSec": 84.05,
        "endSec": 84.27
      },
      {
        "text": "new",
        "startSec": 84.32,
        "endSec": 84.53
      },
      {
        "text": "records",
        "startSec": 84.58,
        "endSec": 84.79
      },
      {
        "text": "into",
        "startSec": 84.84,
        "endSec": 85.06
      },
      {
        "text": "a",
        "startSec": 85.11,
        "endSec": 85.32
      },
      {
        "text": "table,",
        "startSec": 85.37,
        "endSec": 85.58
      },
      {
        "text": "Read",
        "startSec": 85.63,
        "endSec": 85.84
      },
      {
        "text": "is",
        "startSec": 85.89,
        "endSec": 86.11
      },
      {
        "text": "used",
        "startSec": 86.16,
        "endSec": 86.37
      },
      {
        "text": "to",
        "startSec": 86.42,
        "endSec": 86.63
      },
      {
        "text": "retrieve",
        "startSec": 86.68,
        "endSec": 86.9
      },
      {
        "text": "data",
        "startSec": 86.95,
        "endSec": 87.16
      },
      {
        "text": "from",
        "startSec": 87.21,
        "endSec": 87.42
      },
      {
        "text": "a",
        "startSec": 87.47,
        "endSec": 87.69
      },
      {
        "text": "table,",
        "startSec": 87.74,
        "endSec": 87.95
      }
    ]
  },
  {
    "id": "sql-seg-15",
    "title": "15. Update is used to...",
    "startSec": 88,
    "endSec": 93,
    "text": "Update is used to modify existing records, and  Delete is used to remove records from a table.",
    "words": [
      {
        "text": "Update",
        "startSec": 88,
        "endSec": 88.24
      },
      {
        "text": "is",
        "startSec": 88.29,
        "endSec": 88.54
      },
      {
        "text": "used",
        "startSec": 88.59,
        "endSec": 88.83
      },
      {
        "text": "to",
        "startSec": 88.88,
        "endSec": 89.13
      },
      {
        "text": "modify",
        "startSec": 89.18,
        "endSec": 89.42
      },
      {
        "text": "existing",
        "startSec": 89.47,
        "endSec": 89.71
      },
      {
        "text": "records,",
        "startSec": 89.76,
        "endSec": 90.01
      },
      {
        "text": "and",
        "startSec": 90.06,
        "endSec": 90.3
      },
      {
        "text": "Delete",
        "startSec": 90.35,
        "endSec": 90.6
      },
      {
        "text": "is",
        "startSec": 90.65,
        "endSec": 90.89
      },
      {
        "text": "used",
        "startSec": 90.94,
        "endSec": 91.19
      },
      {
        "text": "to",
        "startSec": 91.24,
        "endSec": 91.48
      },
      {
        "text": "remove",
        "startSec": 91.53,
        "endSec": 91.77
      },
      {
        "text": "records",
        "startSec": 91.82,
        "endSec": 92.07
      },
      {
        "text": "from",
        "startSec": 92.12,
        "endSec": 92.36
      },
      {
        "text": "a",
        "startSec": 92.41,
        "endSec": 92.66
      },
      {
        "text": "table.",
        "startSec": 92.71,
        "endSec": 92.95
      }
    ]
  },
  {
    "id": "sql-seg-16",
    "title": "16. Further, to interact with...",
    "startSec": 93,
    "endSec": 99,
    "text": "Further, to interact with any database,  we use something called as SQL Queries…",
    "words": [
      {
        "text": "Further,",
        "startSec": 93,
        "endSec": 93.41
      },
      {
        "text": "to",
        "startSec": 93.46,
        "endSec": 93.87
      },
      {
        "text": "interact",
        "startSec": 93.92,
        "endSec": 94.33
      },
      {
        "text": "with",
        "startSec": 94.38,
        "endSec": 94.8
      },
      {
        "text": "any",
        "startSec": 94.85,
        "endSec": 95.26
      },
      {
        "text": "database,",
        "startSec": 95.31,
        "endSec": 95.72
      },
      {
        "text": "we",
        "startSec": 95.77,
        "endSec": 96.18
      },
      {
        "text": "use",
        "startSec": 96.23,
        "endSec": 96.64
      },
      {
        "text": "something",
        "startSec": 96.69,
        "endSec": 97.1
      },
      {
        "text": "called",
        "startSec": 97.15,
        "endSec": 97.57
      },
      {
        "text": "as",
        "startSec": 97.62,
        "endSec": 98.03
      },
      {
        "text": "SQL",
        "startSec": 98.08,
        "endSec": 98.49
      },
      {
        "text": "Queries…",
        "startSec": 98.54,
        "endSec": 98.95
      }
    ]
  },
  {
    "id": "sql-seg-17",
    "title": "17. we can define SQL...",
    "startSec": 99,
    "endSec": 105,
    "text": "we can define SQL queries as commands or  instructions you give to a database to ask for,",
    "words": [
      {
        "text": "we",
        "startSec": 99,
        "endSec": 99.3
      },
      {
        "text": "can",
        "startSec": 99.35,
        "endSec": 99.66
      },
      {
        "text": "define",
        "startSec": 99.71,
        "endSec": 100.01
      },
      {
        "text": "SQL",
        "startSec": 100.06,
        "endSec": 100.36
      },
      {
        "text": "queries",
        "startSec": 100.41,
        "endSec": 100.71
      },
      {
        "text": "as",
        "startSec": 100.76,
        "endSec": 101.07
      },
      {
        "text": "commands",
        "startSec": 101.12,
        "endSec": 101.42
      },
      {
        "text": "or",
        "startSec": 101.47,
        "endSec": 101.77
      },
      {
        "text": "instructions",
        "startSec": 101.82,
        "endSec": 102.13
      },
      {
        "text": "you",
        "startSec": 102.18,
        "endSec": 102.48
      },
      {
        "text": "give",
        "startSec": 102.53,
        "endSec": 102.83
      },
      {
        "text": "to",
        "startSec": 102.88,
        "endSec": 103.19
      },
      {
        "text": "a",
        "startSec": 103.24,
        "endSec": 103.54
      },
      {
        "text": "database",
        "startSec": 103.59,
        "endSec": 103.89
      },
      {
        "text": "to",
        "startSec": 103.94,
        "endSec": 104.24
      },
      {
        "text": "ask",
        "startSec": 104.29,
        "endSec": 104.6
      },
      {
        "text": "for,",
        "startSec": 104.65,
        "endSec": 104.95
      }
    ]
  },
  {
    "id": "sql-seg-18",
    "title": "18. add, modify, or delete...",
    "startSec": 105,
    "endSec": 113,
    "text": "add, modify, or delete information. In essence,  the basic SQL commands are SELECT, INSERT, UPDATE,",
    "words": [
      {
        "text": "add,",
        "startSec": 105,
        "endSec": 105.48
      },
      {
        "text": "modify,",
        "startSec": 105.53,
        "endSec": 106.02
      },
      {
        "text": "or",
        "startSec": 106.07,
        "endSec": 106.55
      },
      {
        "text": "delete",
        "startSec": 106.6,
        "endSec": 107.08
      },
      {
        "text": "information.",
        "startSec": 107.13,
        "endSec": 107.62
      },
      {
        "text": "In",
        "startSec": 107.67,
        "endSec": 108.15
      },
      {
        "text": "essence,",
        "startSec": 108.2,
        "endSec": 108.68
      },
      {
        "text": "the",
        "startSec": 108.73,
        "endSec": 109.22
      },
      {
        "text": "basic",
        "startSec": 109.27,
        "endSec": 109.75
      },
      {
        "text": "SQL",
        "startSec": 109.8,
        "endSec": 110.28
      },
      {
        "text": "commands",
        "startSec": 110.33,
        "endSec": 110.82
      },
      {
        "text": "are",
        "startSec": 110.87,
        "endSec": 111.35
      },
      {
        "text": "SELECT,",
        "startSec": 111.4,
        "endSec": 111.88
      },
      {
        "text": "INSERT,",
        "startSec": 111.93,
        "endSec": 112.42
      },
      {
        "text": "UPDATE,",
        "startSec": 112.47,
        "endSec": 112.95
      }
    ]
  },
  {
    "id": "sql-seg-19",
    "title": "19. DELETE, and JOIN. These...",
    "startSec": 113,
    "endSec": 118,
    "text": "DELETE, and JOIN. These queries allow us to  retrieve, add, modify, or delete data from the",
    "words": [
      {
        "text": "DELETE,",
        "startSec": 113,
        "endSec": 113.26
      },
      {
        "text": "and",
        "startSec": 113.31,
        "endSec": 113.58
      },
      {
        "text": "JOIN.",
        "startSec": 113.63,
        "endSec": 113.89
      },
      {
        "text": "These",
        "startSec": 113.94,
        "endSec": 114.2
      },
      {
        "text": "queries",
        "startSec": 114.25,
        "endSec": 114.51
      },
      {
        "text": "allow",
        "startSec": 114.56,
        "endSec": 114.83
      },
      {
        "text": "us",
        "startSec": 114.88,
        "endSec": 115.14
      },
      {
        "text": "to",
        "startSec": 115.19,
        "endSec": 115.45
      },
      {
        "text": "retrieve,",
        "startSec": 115.5,
        "endSec": 115.76
      },
      {
        "text": "add,",
        "startSec": 115.81,
        "endSec": 116.08
      },
      {
        "text": "modify,",
        "startSec": 116.13,
        "endSec": 116.39
      },
      {
        "text": "or",
        "startSec": 116.44,
        "endSec": 116.7
      },
      {
        "text": "delete",
        "startSec": 116.75,
        "endSec": 117.01
      },
      {
        "text": "data",
        "startSec": 117.06,
        "endSec": 117.33
      },
      {
        "text": "from",
        "startSec": 117.38,
        "endSec": 117.64
      },
      {
        "text": "the",
        "startSec": 117.69,
        "endSec": 117.95
      }
    ]
  },
  {
    "id": "sql-seg-20",
    "title": "20. SQL Statements: database. Let's understand these...",
    "startSec": 118,
    "endSec": 125,
    "text": "database. Let's understand these basic commands  one by one, starting with SELECT Statement:",
    "words": [
      {
        "text": "database.",
        "startSec": 118,
        "endSec": 118.49
      },
      {
        "text": "Let's",
        "startSec": 118.54,
        "endSec": 119.03
      },
      {
        "text": "understand",
        "startSec": 119.08,
        "endSec": 119.57
      },
      {
        "text": "these",
        "startSec": 119.62,
        "endSec": 120.1
      },
      {
        "text": "basic",
        "startSec": 120.15,
        "endSec": 120.64
      },
      {
        "text": "commands",
        "startSec": 120.69,
        "endSec": 121.18
      },
      {
        "text": "one",
        "startSec": 121.23,
        "endSec": 121.72
      },
      {
        "text": "by",
        "startSec": 121.77,
        "endSec": 122.26
      },
      {
        "text": "one,",
        "startSec": 122.31,
        "endSec": 122.8
      },
      {
        "text": "starting",
        "startSec": 122.85,
        "endSec": 123.33
      },
      {
        "text": "with",
        "startSec": 123.38,
        "endSec": 123.87
      },
      {
        "text": "SELECT",
        "startSec": 123.92,
        "endSec": 124.41
      },
      {
        "text": "Statement:",
        "startSec": 124.46,
        "endSec": 124.95
      }
    ]
  },
  {
    "id": "sql-seg-21",
    "title": "21. It is used to...",
    "startSec": 125,
    "endSec": 130,
    "text": "It is used to retrieve data from the database.  It allows you to specify the columns you want",
    "words": [
      {
        "text": "It",
        "startSec": 125,
        "endSec": 125.23
      },
      {
        "text": "is",
        "startSec": 125.28,
        "endSec": 125.51
      },
      {
        "text": "used",
        "startSec": 125.56,
        "endSec": 125.78
      },
      {
        "text": "to",
        "startSec": 125.83,
        "endSec": 126.06
      },
      {
        "text": "retrieve",
        "startSec": 126.11,
        "endSec": 126.34
      },
      {
        "text": "data",
        "startSec": 126.39,
        "endSec": 126.62
      },
      {
        "text": "from",
        "startSec": 126.67,
        "endSec": 126.89
      },
      {
        "text": "the",
        "startSec": 126.94,
        "endSec": 127.17
      },
      {
        "text": "database.",
        "startSec": 127.22,
        "endSec": 127.45
      },
      {
        "text": "It",
        "startSec": 127.5,
        "endSec": 127.73
      },
      {
        "text": "allows",
        "startSec": 127.78,
        "endSec": 128.01
      },
      {
        "text": "you",
        "startSec": 128.06,
        "endSec": 128.28
      },
      {
        "text": "to",
        "startSec": 128.33,
        "endSec": 128.56
      },
      {
        "text": "specify",
        "startSec": 128.61,
        "endSec": 128.84
      },
      {
        "text": "the",
        "startSec": 128.89,
        "endSec": 129.12
      },
      {
        "text": "columns",
        "startSec": 129.17,
        "endSec": 129.39
      },
      {
        "text": "you",
        "startSec": 129.44,
        "endSec": 129.67
      },
      {
        "text": "want",
        "startSec": 129.72,
        "endSec": 129.95
      }
    ]
  },
  {
    "id": "sql-seg-22",
    "title": "22. to retrieve and the...",
    "startSec": 130,
    "endSec": 135,
    "text": "to retrieve and the conditions for filtering  the data using the WHERE clause. The syntax",
    "words": [
      {
        "text": "to",
        "startSec": 130,
        "endSec": 130.28
      },
      {
        "text": "retrieve",
        "startSec": 130.33,
        "endSec": 130.62
      },
      {
        "text": "and",
        "startSec": 130.67,
        "endSec": 130.95
      },
      {
        "text": "the",
        "startSec": 131,
        "endSec": 131.28
      },
      {
        "text": "conditions",
        "startSec": 131.33,
        "endSec": 131.62
      },
      {
        "text": "for",
        "startSec": 131.67,
        "endSec": 131.95
      },
      {
        "text": "filtering",
        "startSec": 132,
        "endSec": 132.28
      },
      {
        "text": "the",
        "startSec": 132.33,
        "endSec": 132.62
      },
      {
        "text": "data",
        "startSec": 132.67,
        "endSec": 132.95
      },
      {
        "text": "using",
        "startSec": 133,
        "endSec": 133.28
      },
      {
        "text": "the",
        "startSec": 133.33,
        "endSec": 133.62
      },
      {
        "text": "WHERE",
        "startSec": 133.67,
        "endSec": 133.95
      },
      {
        "text": "clause.",
        "startSec": 134,
        "endSec": 134.28
      },
      {
        "text": "The",
        "startSec": 134.33,
        "endSec": 134.62
      },
      {
        "text": "syntax",
        "startSec": 134.67,
        "endSec": 134.95
      }
    ]
  },
  {
    "id": "sql-seg-23",
    "title": "23. for the same is,...",
    "startSec": 135,
    "endSec": 141,
    "text": "for the same is, Here, this “condition”  in WHERE clause is used as a filter that",
    "words": [
      {
        "text": "for",
        "startSec": 135,
        "endSec": 135.32
      },
      {
        "text": "the",
        "startSec": 135.38,
        "endSec": 135.7
      },
      {
        "text": "same",
        "startSec": 135.75,
        "endSec": 136.07
      },
      {
        "text": "is,",
        "startSec": 136.13,
        "endSec": 136.45
      },
      {
        "text": "Here,",
        "startSec": 136.5,
        "endSec": 136.82
      },
      {
        "text": "this",
        "startSec": 136.88,
        "endSec": 137.2
      },
      {
        "text": "“condition”",
        "startSec": 137.25,
        "endSec": 137.57
      },
      {
        "text": "in",
        "startSec": 137.63,
        "endSec": 137.95
      },
      {
        "text": "WHERE",
        "startSec": 138,
        "endSec": 138.32
      },
      {
        "text": "clause",
        "startSec": 138.38,
        "endSec": 138.7
      },
      {
        "text": "is",
        "startSec": 138.75,
        "endSec": 139.07
      },
      {
        "text": "used",
        "startSec": 139.13,
        "endSec": 139.45
      },
      {
        "text": "as",
        "startSec": 139.5,
        "endSec": 139.82
      },
      {
        "text": "a",
        "startSec": 139.88,
        "endSec": 140.2
      },
      {
        "text": "filter",
        "startSec": 140.25,
        "endSec": 140.57
      },
      {
        "text": "that",
        "startSec": 140.63,
        "endSec": 140.95
      }
    ]
  },
  {
    "id": "sql-seg-24",
    "title": "24. specifies which rows from...",
    "startSec": 141,
    "endSec": 147,
    "text": "specifies which rows from a table should be  included in the query's result. This way,",
    "words": [
      {
        "text": "specifies",
        "startSec": 141,
        "endSec": 141.35
      },
      {
        "text": "which",
        "startSec": 141.4,
        "endSec": 141.75
      },
      {
        "text": "rows",
        "startSec": 141.8,
        "endSec": 142.15
      },
      {
        "text": "from",
        "startSec": 142.2,
        "endSec": 142.55
      },
      {
        "text": "a",
        "startSec": 142.6,
        "endSec": 142.95
      },
      {
        "text": "table",
        "startSec": 143,
        "endSec": 143.35
      },
      {
        "text": "should",
        "startSec": 143.4,
        "endSec": 143.75
      },
      {
        "text": "be",
        "startSec": 143.8,
        "endSec": 144.15
      },
      {
        "text": "included",
        "startSec": 144.2,
        "endSec": 144.55
      },
      {
        "text": "in",
        "startSec": 144.6,
        "endSec": 144.95
      },
      {
        "text": "the",
        "startSec": 145,
        "endSec": 145.35
      },
      {
        "text": "query's",
        "startSec": 145.4,
        "endSec": 145.75
      },
      {
        "text": "result.",
        "startSec": 145.8,
        "endSec": 146.15
      },
      {
        "text": "This",
        "startSec": 146.2,
        "endSec": 146.55
      },
      {
        "text": "way,",
        "startSec": 146.6,
        "endSec": 146.95
      }
    ]
  },
  {
    "id": "sql-seg-25",
    "title": "25. it allows you to...",
    "startSec": 147,
    "endSec": 153,
    "text": "it allows you to narrow down the data and retrieve  only the records that meet certain criteria.",
    "words": [
      {
        "text": "it",
        "startSec": 147,
        "endSec": 147.3
      },
      {
        "text": "allows",
        "startSec": 147.35,
        "endSec": 147.66
      },
      {
        "text": "you",
        "startSec": 147.71,
        "endSec": 148.01
      },
      {
        "text": "to",
        "startSec": 148.06,
        "endSec": 148.36
      },
      {
        "text": "narrow",
        "startSec": 148.41,
        "endSec": 148.71
      },
      {
        "text": "down",
        "startSec": 148.76,
        "endSec": 149.07
      },
      {
        "text": "the",
        "startSec": 149.12,
        "endSec": 149.42
      },
      {
        "text": "data",
        "startSec": 149.47,
        "endSec": 149.77
      },
      {
        "text": "and",
        "startSec": 149.82,
        "endSec": 150.13
      },
      {
        "text": "retrieve",
        "startSec": 150.18,
        "endSec": 150.48
      },
      {
        "text": "only",
        "startSec": 150.53,
        "endSec": 150.83
      },
      {
        "text": "the",
        "startSec": 150.88,
        "endSec": 151.19
      },
      {
        "text": "records",
        "startSec": 151.24,
        "endSec": 151.54
      },
      {
        "text": "that",
        "startSec": 151.59,
        "endSec": 151.89
      },
      {
        "text": "meet",
        "startSec": 151.94,
        "endSec": 152.24
      },
      {
        "text": "certain",
        "startSec": 152.29,
        "endSec": 152.6
      },
      {
        "text": "criteria.",
        "startSec": 152.65,
        "endSec": 152.95
      }
    ]
  },
  {
    "id": "sql-seg-26",
    "title": "26. And do note that...",
    "startSec": 153,
    "endSec": 159,
    "text": "And do note that in most SQL database management  systems, each SQL statement or command ends with",
    "words": [
      {
        "text": "And",
        "startSec": 153,
        "endSec": 153.3
      },
      {
        "text": "do",
        "startSec": 153.35,
        "endSec": 153.66
      },
      {
        "text": "note",
        "startSec": 153.71,
        "endSec": 154.01
      },
      {
        "text": "that",
        "startSec": 154.06,
        "endSec": 154.36
      },
      {
        "text": "in",
        "startSec": 154.41,
        "endSec": 154.71
      },
      {
        "text": "most",
        "startSec": 154.76,
        "endSec": 155.07
      },
      {
        "text": "SQL",
        "startSec": 155.12,
        "endSec": 155.42
      },
      {
        "text": "database",
        "startSec": 155.47,
        "endSec": 155.77
      },
      {
        "text": "management",
        "startSec": 155.82,
        "endSec": 156.13
      },
      {
        "text": "systems,",
        "startSec": 156.18,
        "endSec": 156.48
      },
      {
        "text": "each",
        "startSec": 156.53,
        "endSec": 156.83
      },
      {
        "text": "SQL",
        "startSec": 156.88,
        "endSec": 157.19
      },
      {
        "text": "statement",
        "startSec": 157.24,
        "endSec": 157.54
      },
      {
        "text": "or",
        "startSec": 157.59,
        "endSec": 157.89
      },
      {
        "text": "command",
        "startSec": 157.94,
        "endSec": 158.24
      },
      {
        "text": "ends",
        "startSec": 158.29,
        "endSec": 158.6
      },
      {
        "text": "with",
        "startSec": 158.65,
        "endSec": 158.95
      }
    ]
  },
  {
    "id": "sql-seg-27",
    "title": "27. a semicolon (;) Next...",
    "startSec": 159,
    "endSec": 165,
    "text": "a semicolon (;) Next is INSERT Statement:  It is used to add new records to a table,",
    "words": [
      {
        "text": "a",
        "startSec": 159,
        "endSec": 159.3
      },
      {
        "text": "semicolon",
        "startSec": 159.35,
        "endSec": 159.66
      },
      {
        "text": "(;)",
        "startSec": 159.71,
        "endSec": 160.01
      },
      {
        "text": "Next",
        "startSec": 160.06,
        "endSec": 160.36
      },
      {
        "text": "is",
        "startSec": 160.41,
        "endSec": 160.71
      },
      {
        "text": "INSERT",
        "startSec": 160.76,
        "endSec": 161.07
      },
      {
        "text": "Statement:",
        "startSec": 161.12,
        "endSec": 161.42
      },
      {
        "text": "It",
        "startSec": 161.47,
        "endSec": 161.77
      },
      {
        "text": "is",
        "startSec": 161.82,
        "endSec": 162.13
      },
      {
        "text": "used",
        "startSec": 162.18,
        "endSec": 162.48
      },
      {
        "text": "to",
        "startSec": 162.53,
        "endSec": 162.83
      },
      {
        "text": "add",
        "startSec": 162.88,
        "endSec": 163.19
      },
      {
        "text": "new",
        "startSec": 163.24,
        "endSec": 163.54
      },
      {
        "text": "records",
        "startSec": 163.59,
        "endSec": 163.89
      },
      {
        "text": "to",
        "startSec": 163.94,
        "endSec": 164.24
      },
      {
        "text": "a",
        "startSec": 164.29,
        "endSec": 164.6
      },
      {
        "text": "table,",
        "startSec": 164.65,
        "endSec": 164.95
      }
    ]
  },
  {
    "id": "sql-seg-28",
    "title": "28. wherein, we specify the...",
    "startSec": 165,
    "endSec": 172,
    "text": "wherein, we specify the values for each column  in the new row. The syntax for the same is",
    "words": [
      {
        "text": "wherein,",
        "startSec": 165,
        "endSec": 165.34
      },
      {
        "text": "we",
        "startSec": 165.39,
        "endSec": 165.73
      },
      {
        "text": "specify",
        "startSec": 165.78,
        "endSec": 166.12
      },
      {
        "text": "the",
        "startSec": 166.17,
        "endSec": 166.51
      },
      {
        "text": "values",
        "startSec": 166.56,
        "endSec": 166.89
      },
      {
        "text": "for",
        "startSec": 166.94,
        "endSec": 167.28
      },
      {
        "text": "each",
        "startSec": 167.33,
        "endSec": 167.67
      },
      {
        "text": "column",
        "startSec": 167.72,
        "endSec": 168.06
      },
      {
        "text": "in",
        "startSec": 168.11,
        "endSec": 168.45
      },
      {
        "text": "the",
        "startSec": 168.5,
        "endSec": 168.84
      },
      {
        "text": "new",
        "startSec": 168.89,
        "endSec": 169.23
      },
      {
        "text": "row.",
        "startSec": 169.28,
        "endSec": 169.62
      },
      {
        "text": "The",
        "startSec": 169.67,
        "endSec": 170.01
      },
      {
        "text": "syntax",
        "startSec": 170.06,
        "endSec": 170.39
      },
      {
        "text": "for",
        "startSec": 170.44,
        "endSec": 170.78
      },
      {
        "text": "the",
        "startSec": 170.83,
        "endSec": 171.17
      },
      {
        "text": "same",
        "startSec": 171.22,
        "endSec": 171.56
      },
      {
        "text": "is",
        "startSec": 171.61,
        "endSec": 171.95
      }
    ]
  },
  {
    "id": "sql-seg-29",
    "title": "29. Next, UPDATE Statement: which...",
    "startSec": 172,
    "endSec": 178,
    "text": "Next, UPDATE Statement: which is used to modify  existing records in a table. It allows us to",
    "words": [
      {
        "text": "Next,",
        "startSec": 172,
        "endSec": 172.3
      },
      {
        "text": "UPDATE",
        "startSec": 172.35,
        "endSec": 172.66
      },
      {
        "text": "Statement:",
        "startSec": 172.71,
        "endSec": 173.01
      },
      {
        "text": "which",
        "startSec": 173.06,
        "endSec": 173.36
      },
      {
        "text": "is",
        "startSec": 173.41,
        "endSec": 173.71
      },
      {
        "text": "used",
        "startSec": 173.76,
        "endSec": 174.07
      },
      {
        "text": "to",
        "startSec": 174.12,
        "endSec": 174.42
      },
      {
        "text": "modify",
        "startSec": 174.47,
        "endSec": 174.77
      },
      {
        "text": "existing",
        "startSec": 174.82,
        "endSec": 175.13
      },
      {
        "text": "records",
        "startSec": 175.18,
        "endSec": 175.48
      },
      {
        "text": "in",
        "startSec": 175.53,
        "endSec": 175.83
      },
      {
        "text": "a",
        "startSec": 175.88,
        "endSec": 176.19
      },
      {
        "text": "table.",
        "startSec": 176.24,
        "endSec": 176.54
      },
      {
        "text": "It",
        "startSec": 176.59,
        "endSec": 176.89
      },
      {
        "text": "allows",
        "startSec": 176.94,
        "endSec": 177.24
      },
      {
        "text": "us",
        "startSec": 177.29,
        "endSec": 177.6
      },
      {
        "text": "to",
        "startSec": 177.65,
        "endSec": 177.95
      }
    ]
  },
  {
    "id": "sql-seg-30",
    "title": "30. change the values of...",
    "startSec": 178,
    "endSec": 184,
    "text": "change the values of specific columns based on  certain conditions. The syntax for the same is,",
    "words": [
      {
        "text": "change",
        "startSec": 178,
        "endSec": 178.32
      },
      {
        "text": "the",
        "startSec": 178.38,
        "endSec": 178.7
      },
      {
        "text": "values",
        "startSec": 178.75,
        "endSec": 179.07
      },
      {
        "text": "of",
        "startSec": 179.13,
        "endSec": 179.45
      },
      {
        "text": "specific",
        "startSec": 179.5,
        "endSec": 179.82
      },
      {
        "text": "columns",
        "startSec": 179.88,
        "endSec": 180.2
      },
      {
        "text": "based",
        "startSec": 180.25,
        "endSec": 180.57
      },
      {
        "text": "on",
        "startSec": 180.63,
        "endSec": 180.95
      },
      {
        "text": "certain",
        "startSec": 181,
        "endSec": 181.32
      },
      {
        "text": "conditions.",
        "startSec": 181.38,
        "endSec": 181.7
      },
      {
        "text": "The",
        "startSec": 181.75,
        "endSec": 182.07
      },
      {
        "text": "syntax",
        "startSec": 182.13,
        "endSec": 182.45
      },
      {
        "text": "for",
        "startSec": 182.5,
        "endSec": 182.82
      },
      {
        "text": "the",
        "startSec": 182.88,
        "endSec": 183.2
      },
      {
        "text": "same",
        "startSec": 183.25,
        "endSec": 183.57
      },
      {
        "text": "is,",
        "startSec": 183.63,
        "endSec": 183.95
      }
    ]
  },
  {
    "id": "sql-seg-31",
    "title": "31. Next, DELETE Statement which...",
    "startSec": 184,
    "endSec": 189,
    "text": "Next, DELETE Statement which is used to  remove records from a table based on specified",
    "words": [
      {
        "text": "Next,",
        "startSec": 184,
        "endSec": 184.28
      },
      {
        "text": "DELETE",
        "startSec": 184.33,
        "endSec": 184.62
      },
      {
        "text": "Statement",
        "startSec": 184.67,
        "endSec": 184.95
      },
      {
        "text": "which",
        "startSec": 185,
        "endSec": 185.28
      },
      {
        "text": "is",
        "startSec": 185.33,
        "endSec": 185.62
      },
      {
        "text": "used",
        "startSec": 185.67,
        "endSec": 185.95
      },
      {
        "text": "to",
        "startSec": 186,
        "endSec": 186.28
      },
      {
        "text": "remove",
        "startSec": 186.33,
        "endSec": 186.62
      },
      {
        "text": "records",
        "startSec": 186.67,
        "endSec": 186.95
      },
      {
        "text": "from",
        "startSec": 187,
        "endSec": 187.28
      },
      {
        "text": "a",
        "startSec": 187.33,
        "endSec": 187.62
      },
      {
        "text": "table",
        "startSec": 187.67,
        "endSec": 187.95
      },
      {
        "text": "based",
        "startSec": 188,
        "endSec": 188.28
      },
      {
        "text": "on",
        "startSec": 188.33,
        "endSec": 188.62
      },
      {
        "text": "specified",
        "startSec": 188.67,
        "endSec": 188.95
      }
    ]
  },
  {
    "id": "sql-seg-32",
    "title": "32. conditions. The syntax for...",
    "startSec": 189,
    "endSec": 197,
    "text": "conditions. The syntax for the same is, And  lastly, the JOIN statement is used to combine rows",
    "words": [
      {
        "text": "conditions.",
        "startSec": 189,
        "endSec": 189.42
      },
      {
        "text": "The",
        "startSec": 189.47,
        "endSec": 189.89
      },
      {
        "text": "syntax",
        "startSec": 189.94,
        "endSec": 190.36
      },
      {
        "text": "for",
        "startSec": 190.41,
        "endSec": 190.83
      },
      {
        "text": "the",
        "startSec": 190.88,
        "endSec": 191.3
      },
      {
        "text": "same",
        "startSec": 191.35,
        "endSec": 191.77
      },
      {
        "text": "is,",
        "startSec": 191.82,
        "endSec": 192.24
      },
      {
        "text": "And",
        "startSec": 192.29,
        "endSec": 192.71
      },
      {
        "text": "lastly,",
        "startSec": 192.76,
        "endSec": 193.19
      },
      {
        "text": "the",
        "startSec": 193.24,
        "endSec": 193.66
      },
      {
        "text": "JOIN",
        "startSec": 193.71,
        "endSec": 194.13
      },
      {
        "text": "statement",
        "startSec": 194.18,
        "endSec": 194.6
      },
      {
        "text": "is",
        "startSec": 194.65,
        "endSec": 195.07
      },
      {
        "text": "used",
        "startSec": 195.12,
        "endSec": 195.54
      },
      {
        "text": "to",
        "startSec": 195.59,
        "endSec": 196.01
      },
      {
        "text": "combine",
        "startSec": 196.06,
        "endSec": 196.48
      },
      {
        "text": "rows",
        "startSec": 196.53,
        "endSec": 196.95
      }
    ]
  },
  {
    "id": "sql-seg-33",
    "title": "33. from two or more...",
    "startSec": 197,
    "endSec": 203,
    "text": "from two or more tables based on a related column  between them. There are different types of JOINs,",
    "words": [
      {
        "text": "from",
        "startSec": 197,
        "endSec": 197.28
      },
      {
        "text": "two",
        "startSec": 197.33,
        "endSec": 197.62
      },
      {
        "text": "or",
        "startSec": 197.67,
        "endSec": 197.95
      },
      {
        "text": "more",
        "startSec": 198,
        "endSec": 198.28
      },
      {
        "text": "tables",
        "startSec": 198.33,
        "endSec": 198.62
      },
      {
        "text": "based",
        "startSec": 198.67,
        "endSec": 198.95
      },
      {
        "text": "on",
        "startSec": 199,
        "endSec": 199.28
      },
      {
        "text": "a",
        "startSec": 199.33,
        "endSec": 199.62
      },
      {
        "text": "related",
        "startSec": 199.67,
        "endSec": 199.95
      },
      {
        "text": "column",
        "startSec": 200,
        "endSec": 200.28
      },
      {
        "text": "between",
        "startSec": 200.33,
        "endSec": 200.62
      },
      {
        "text": "them.",
        "startSec": 200.67,
        "endSec": 200.95
      },
      {
        "text": "There",
        "startSec": 201,
        "endSec": 201.28
      },
      {
        "text": "are",
        "startSec": 201.33,
        "endSec": 201.62
      },
      {
        "text": "different",
        "startSec": 201.67,
        "endSec": 201.95
      },
      {
        "text": "types",
        "startSec": 202,
        "endSec": 202.28
      },
      {
        "text": "of",
        "startSec": 202.33,
        "endSec": 202.62
      },
      {
        "text": "JOINs,",
        "startSec": 202.67,
        "endSec": 202.95
      }
    ]
  },
  {
    "id": "sql-seg-34",
    "title": "34. including INNER JOIN, LEFT...",
    "startSec": 203,
    "endSec": 210,
    "text": "including INNER JOIN, LEFT JOIN, RIGHT JOIN,  and FULL JOIN, but the basic syntax for the most",
    "words": [
      {
        "text": "including",
        "startSec": 203,
        "endSec": 203.36
      },
      {
        "text": "INNER",
        "startSec": 203.41,
        "endSec": 203.77
      },
      {
        "text": "JOIN,",
        "startSec": 203.82,
        "endSec": 204.19
      },
      {
        "text": "LEFT",
        "startSec": 204.24,
        "endSec": 204.6
      },
      {
        "text": "JOIN,",
        "startSec": 204.65,
        "endSec": 205.01
      },
      {
        "text": "RIGHT",
        "startSec": 205.06,
        "endSec": 205.42
      },
      {
        "text": "JOIN,",
        "startSec": 205.47,
        "endSec": 205.83
      },
      {
        "text": "and",
        "startSec": 205.88,
        "endSec": 206.24
      },
      {
        "text": "FULL",
        "startSec": 206.29,
        "endSec": 206.66
      },
      {
        "text": "JOIN,",
        "startSec": 206.71,
        "endSec": 207.07
      },
      {
        "text": "but",
        "startSec": 207.12,
        "endSec": 207.48
      },
      {
        "text": "the",
        "startSec": 207.53,
        "endSec": 207.89
      },
      {
        "text": "basic",
        "startSec": 207.94,
        "endSec": 208.3
      },
      {
        "text": "syntax",
        "startSec": 208.35,
        "endSec": 208.71
      },
      {
        "text": "for",
        "startSec": 208.76,
        "endSec": 209.13
      },
      {
        "text": "the",
        "startSec": 209.18,
        "endSec": 209.54
      },
      {
        "text": "most",
        "startSec": 209.59,
        "endSec": 209.95
      }
    ]
  },
  {
    "id": "sql-seg-35",
    "title": "35. common JOINs is as...",
    "startSec": 210,
    "endSec": 216,
    "text": "common JOINs is as follows: In the JOIN syntax,  table1 and table2 are the names of the tables",
    "words": [
      {
        "text": "common",
        "startSec": 210,
        "endSec": 210.28
      },
      {
        "text": "JOINs",
        "startSec": 210.33,
        "endSec": 210.62
      },
      {
        "text": "is",
        "startSec": 210.67,
        "endSec": 210.95
      },
      {
        "text": "as",
        "startSec": 211,
        "endSec": 211.28
      },
      {
        "text": "follows:",
        "startSec": 211.33,
        "endSec": 211.62
      },
      {
        "text": "In",
        "startSec": 211.67,
        "endSec": 211.95
      },
      {
        "text": "the",
        "startSec": 212,
        "endSec": 212.28
      },
      {
        "text": "JOIN",
        "startSec": 212.33,
        "endSec": 212.62
      },
      {
        "text": "syntax,",
        "startSec": 212.67,
        "endSec": 212.95
      },
      {
        "text": "table1",
        "startSec": 213,
        "endSec": 213.28
      },
      {
        "text": "and",
        "startSec": 213.33,
        "endSec": 213.62
      },
      {
        "text": "table2",
        "startSec": 213.67,
        "endSec": 213.95
      },
      {
        "text": "are",
        "startSec": 214,
        "endSec": 214.28
      },
      {
        "text": "the",
        "startSec": 214.33,
        "endSec": 214.62
      },
      {
        "text": "names",
        "startSec": 214.67,
        "endSec": 214.95
      },
      {
        "text": "of",
        "startSec": 215,
        "endSec": 215.28
      },
      {
        "text": "the",
        "startSec": 215.33,
        "endSec": 215.62
      },
      {
        "text": "tables",
        "startSec": 215.67,
        "endSec": 215.95
      }
    ]
  },
  {
    "id": "sql-seg-36",
    "title": "36. you want to join,...",
    "startSec": 216,
    "endSec": 222,
    "text": "you want to join, and column_name is the common  column between these tables on which the join is",
    "words": [
      {
        "text": "you",
        "startSec": 216,
        "endSec": 216.28
      },
      {
        "text": "want",
        "startSec": 216.33,
        "endSec": 216.62
      },
      {
        "text": "to",
        "startSec": 216.67,
        "endSec": 216.95
      },
      {
        "text": "join,",
        "startSec": 217,
        "endSec": 217.28
      },
      {
        "text": "and",
        "startSec": 217.33,
        "endSec": 217.62
      },
      {
        "text": "column_name",
        "startSec": 217.67,
        "endSec": 217.95
      },
      {
        "text": "is",
        "startSec": 218,
        "endSec": 218.28
      },
      {
        "text": "the",
        "startSec": 218.33,
        "endSec": 218.62
      },
      {
        "text": "common",
        "startSec": 218.67,
        "endSec": 218.95
      },
      {
        "text": "column",
        "startSec": 219,
        "endSec": 219.28
      },
      {
        "text": "between",
        "startSec": 219.33,
        "endSec": 219.62
      },
      {
        "text": "these",
        "startSec": 219.67,
        "endSec": 219.95
      },
      {
        "text": "tables",
        "startSec": 220,
        "endSec": 220.28
      },
      {
        "text": "on",
        "startSec": 220.33,
        "endSec": 220.62
      },
      {
        "text": "which",
        "startSec": 220.67,
        "endSec": 220.95
      },
      {
        "text": "the",
        "startSec": 221,
        "endSec": 221.28
      },
      {
        "text": "join",
        "startSec": 221.33,
        "endSec": 221.62
      },
      {
        "text": "is",
        "startSec": 221.67,
        "endSec": 221.95
      }
    ]
  },
  {
    "id": "sql-seg-37",
    "title": "37. based. By using JOINs,...",
    "startSec": 222,
    "endSec": 228,
    "text": "based. By using JOINs, you can efficiently combine  data from different tables to extract meaningful",
    "words": [
      {
        "text": "based.",
        "startSec": 222,
        "endSec": 222.35
      },
      {
        "text": "By",
        "startSec": 222.4,
        "endSec": 222.75
      },
      {
        "text": "using",
        "startSec": 222.8,
        "endSec": 223.15
      },
      {
        "text": "JOINs,",
        "startSec": 223.2,
        "endSec": 223.55
      },
      {
        "text": "you",
        "startSec": 223.6,
        "endSec": 223.95
      },
      {
        "text": "can",
        "startSec": 224,
        "endSec": 224.35
      },
      {
        "text": "efficiently",
        "startSec": 224.4,
        "endSec": 224.75
      },
      {
        "text": "combine",
        "startSec": 224.8,
        "endSec": 225.15
      },
      {
        "text": "data",
        "startSec": 225.2,
        "endSec": 225.55
      },
      {
        "text": "from",
        "startSec": 225.6,
        "endSec": 225.95
      },
      {
        "text": "different",
        "startSec": 226,
        "endSec": 226.35
      },
      {
        "text": "tables",
        "startSec": 226.4,
        "endSec": 226.75
      },
      {
        "text": "to",
        "startSec": 226.8,
        "endSec": 227.15
      },
      {
        "text": "extract",
        "startSec": 227.2,
        "endSec": 227.55
      },
      {
        "text": "meaningful",
        "startSec": 227.6,
        "endSec": 227.95
      }
    ]
  },
  {
    "id": "sql-seg-38",
    "title": "38. information from a relational...",
    "startSec": 228,
    "endSec": 233,
    "text": "information from a relational database. Next,  lets continue on SQL concepts, starting with,",
    "words": [
      {
        "text": "information",
        "startSec": 228,
        "endSec": 228.33
      },
      {
        "text": "from",
        "startSec": 228.38,
        "endSec": 228.72
      },
      {
        "text": "a",
        "startSec": 228.77,
        "endSec": 229.1
      },
      {
        "text": "relational",
        "startSec": 229.15,
        "endSec": 229.49
      },
      {
        "text": "database.",
        "startSec": 229.54,
        "endSec": 229.87
      },
      {
        "text": "Next,",
        "startSec": 229.92,
        "endSec": 230.26
      },
      {
        "text": "lets",
        "startSec": 230.31,
        "endSec": 230.64
      },
      {
        "text": "continue",
        "startSec": 230.69,
        "endSec": 231.03
      },
      {
        "text": "on",
        "startSec": 231.08,
        "endSec": 231.41
      },
      {
        "text": "SQL",
        "startSec": 231.46,
        "endSec": 231.8
      },
      {
        "text": "concepts,",
        "startSec": 231.85,
        "endSec": 232.18
      },
      {
        "text": "starting",
        "startSec": 232.23,
        "endSec": 232.57
      },
      {
        "text": "with,",
        "startSec": 232.62,
        "endSec": 232.95
      }
    ]
  },
  {
    "id": "sql-seg-39",
    "title": "39. Data Types: Data Types: Well, in...",
    "startSec": 233,
    "endSec": 241,
    "text": "Data Types: Well, in SQL, each column in a  table has a data type that defines the type",
    "words": [
      {
        "text": "Data",
        "startSec": 233,
        "endSec": 233.39
      },
      {
        "text": "Types:",
        "startSec": 233.44,
        "endSec": 233.84
      },
      {
        "text": "Well,",
        "startSec": 233.89,
        "endSec": 234.28
      },
      {
        "text": "in",
        "startSec": 234.33,
        "endSec": 234.73
      },
      {
        "text": "SQL,",
        "startSec": 234.78,
        "endSec": 235.17
      },
      {
        "text": "each",
        "startSec": 235.22,
        "endSec": 235.62
      },
      {
        "text": "column",
        "startSec": 235.67,
        "endSec": 236.06
      },
      {
        "text": "in",
        "startSec": 236.11,
        "endSec": 236.51
      },
      {
        "text": "a",
        "startSec": 236.56,
        "endSec": 236.95
      },
      {
        "text": "table",
        "startSec": 237,
        "endSec": 237.39
      },
      {
        "text": "has",
        "startSec": 237.44,
        "endSec": 237.84
      },
      {
        "text": "a",
        "startSec": 237.89,
        "endSec": 238.28
      },
      {
        "text": "data",
        "startSec": 238.33,
        "endSec": 238.73
      },
      {
        "text": "type",
        "startSec": 238.78,
        "endSec": 239.17
      },
      {
        "text": "that",
        "startSec": 239.22,
        "endSec": 239.62
      },
      {
        "text": "defines",
        "startSec": 239.67,
        "endSec": 240.06
      },
      {
        "text": "the",
        "startSec": 240.11,
        "endSec": 240.51
      },
      {
        "text": "type",
        "startSec": 240.56,
        "endSec": 240.95
      }
    ]
  },
  {
    "id": "sql-seg-40",
    "title": "40. of data it can...",
    "startSec": 241,
    "endSec": 247,
    "text": "of data it can store. Common data types include  INTEGER, VARCHAR, DATE, and BOOLEAN, among others.",
    "words": [
      {
        "text": "of",
        "startSec": 241,
        "endSec": 241.32
      },
      {
        "text": "data",
        "startSec": 241.38,
        "endSec": 241.7
      },
      {
        "text": "it",
        "startSec": 241.75,
        "endSec": 242.07
      },
      {
        "text": "can",
        "startSec": 242.13,
        "endSec": 242.45
      },
      {
        "text": "store.",
        "startSec": 242.5,
        "endSec": 242.82
      },
      {
        "text": "Common",
        "startSec": 242.88,
        "endSec": 243.2
      },
      {
        "text": "data",
        "startSec": 243.25,
        "endSec": 243.57
      },
      {
        "text": "types",
        "startSec": 243.63,
        "endSec": 243.95
      },
      {
        "text": "include",
        "startSec": 244,
        "endSec": 244.32
      },
      {
        "text": "INTEGER,",
        "startSec": 244.38,
        "endSec": 244.7
      },
      {
        "text": "VARCHAR,",
        "startSec": 244.75,
        "endSec": 245.07
      },
      {
        "text": "DATE,",
        "startSec": 245.13,
        "endSec": 245.45
      },
      {
        "text": "and",
        "startSec": 245.5,
        "endSec": 245.82
      },
      {
        "text": "BOOLEAN,",
        "startSec": 245.88,
        "endSec": 246.2
      },
      {
        "text": "among",
        "startSec": 246.25,
        "endSec": 246.57
      },
      {
        "text": "others.",
        "startSec": 246.63,
        "endSec": 246.95
      }
    ]
  },
  {
    "id": "sql-seg-41",
    "title": "41. Similar to them, we...",
    "startSec": 247,
    "endSec": 252,
    "text": "Similar to them, we have Constraints, which  are rules defined on tables to maintain data",
    "words": [
      {
        "text": "Similar",
        "startSec": 247,
        "endSec": 247.28
      },
      {
        "text": "to",
        "startSec": 247.33,
        "endSec": 247.62
      },
      {
        "text": "them,",
        "startSec": 247.67,
        "endSec": 247.95
      },
      {
        "text": "we",
        "startSec": 248,
        "endSec": 248.28
      },
      {
        "text": "have",
        "startSec": 248.33,
        "endSec": 248.62
      },
      {
        "text": "Constraints,",
        "startSec": 248.67,
        "endSec": 248.95
      },
      {
        "text": "which",
        "startSec": 249,
        "endSec": 249.28
      },
      {
        "text": "are",
        "startSec": 249.33,
        "endSec": 249.62
      },
      {
        "text": "rules",
        "startSec": 249.67,
        "endSec": 249.95
      },
      {
        "text": "defined",
        "startSec": 250,
        "endSec": 250.28
      },
      {
        "text": "on",
        "startSec": 250.33,
        "endSec": 250.62
      },
      {
        "text": "tables",
        "startSec": 250.67,
        "endSec": 250.95
      },
      {
        "text": "to",
        "startSec": 251,
        "endSec": 251.28
      },
      {
        "text": "maintain",
        "startSec": 251.33,
        "endSec": 251.62
      },
      {
        "text": "data",
        "startSec": 251.67,
        "endSec": 251.95
      }
    ]
  },
  {
    "id": "sql-seg-42",
    "title": "42. integrity. Common constraints are...",
    "startSec": 252,
    "endSec": 257,
    "text": "integrity. Common constraints are PRIMARY KEY  (ensures the uniqueness of a column's values),",
    "words": [
      {
        "text": "integrity.",
        "startSec": 252,
        "endSec": 252.33
      },
      {
        "text": "Common",
        "startSec": 252.38,
        "endSec": 252.72
      },
      {
        "text": "constraints",
        "startSec": 252.77,
        "endSec": 253.1
      },
      {
        "text": "are",
        "startSec": 253.15,
        "endSec": 253.49
      },
      {
        "text": "PRIMARY",
        "startSec": 253.54,
        "endSec": 253.87
      },
      {
        "text": "KEY",
        "startSec": 253.92,
        "endSec": 254.26
      },
      {
        "text": "(ensures",
        "startSec": 254.31,
        "endSec": 254.64
      },
      {
        "text": "the",
        "startSec": 254.69,
        "endSec": 255.03
      },
      {
        "text": "uniqueness",
        "startSec": 255.08,
        "endSec": 255.41
      },
      {
        "text": "of",
        "startSec": 255.46,
        "endSec": 255.8
      },
      {
        "text": "a",
        "startSec": 255.85,
        "endSec": 256.18
      },
      {
        "text": "column's",
        "startSec": 256.23,
        "endSec": 256.57
      },
      {
        "text": "values),",
        "startSec": 256.62,
        "endSec": 256.95
      }
    ]
  },
  {
    "id": "sql-seg-43",
    "title": "43. FOREIGN KEY (maintains referential...",
    "startSec": 257,
    "endSec": 262,
    "text": "FOREIGN KEY (maintains referential  integrity between two tables),",
    "words": [
      {
        "text": "FOREIGN",
        "startSec": 257,
        "endSec": 257.57
      },
      {
        "text": "KEY",
        "startSec": 257.63,
        "endSec": 258.2
      },
      {
        "text": "(maintains",
        "startSec": 258.25,
        "endSec": 258.82
      },
      {
        "text": "referential",
        "startSec": 258.88,
        "endSec": 259.45
      },
      {
        "text": "integrity",
        "startSec": 259.5,
        "endSec": 260.07
      },
      {
        "text": "between",
        "startSec": 260.13,
        "endSec": 260.7
      },
      {
        "text": "two",
        "startSec": 260.75,
        "endSec": 261.32
      },
      {
        "text": "tables),",
        "startSec": 261.38,
        "endSec": 261.95
      }
    ]
  },
  {
    "id": "sql-seg-44",
    "title": "44. NOT NULL (ensures a...",
    "startSec": 262,
    "endSec": 269,
    "text": "NOT NULL (ensures a column must have a value),  and UNIQUE (ensures unique values in a column).",
    "words": [
      {
        "text": "NOT",
        "startSec": 262,
        "endSec": 262.36
      },
      {
        "text": "NULL",
        "startSec": 262.41,
        "endSec": 262.77
      },
      {
        "text": "(ensures",
        "startSec": 262.82,
        "endSec": 263.19
      },
      {
        "text": "a",
        "startSec": 263.24,
        "endSec": 263.6
      },
      {
        "text": "column",
        "startSec": 263.65,
        "endSec": 264.01
      },
      {
        "text": "must",
        "startSec": 264.06,
        "endSec": 264.42
      },
      {
        "text": "have",
        "startSec": 264.47,
        "endSec": 264.83
      },
      {
        "text": "a",
        "startSec": 264.88,
        "endSec": 265.24
      },
      {
        "text": "value),",
        "startSec": 265.29,
        "endSec": 265.66
      },
      {
        "text": "and",
        "startSec": 265.71,
        "endSec": 266.07
      },
      {
        "text": "UNIQUE",
        "startSec": 266.12,
        "endSec": 266.48
      },
      {
        "text": "(ensures",
        "startSec": 266.53,
        "endSec": 266.89
      },
      {
        "text": "unique",
        "startSec": 266.94,
        "endSec": 267.3
      },
      {
        "text": "values",
        "startSec": 267.35,
        "endSec": 267.71
      },
      {
        "text": "in",
        "startSec": 267.76,
        "endSec": 268.13
      },
      {
        "text": "a",
        "startSec": 268.18,
        "endSec": 268.54
      },
      {
        "text": "column).",
        "startSec": 268.59,
        "endSec": 268.95
      }
    ]
  },
  {
    "id": "sql-seg-45",
    "title": "45. If you want to...",
    "startSec": 269,
    "endSec": 274,
    "text": "If you want to understand all types of keys  in a DBMS, you can refer to this video.",
    "words": [
      {
        "text": "If",
        "startSec": 269,
        "endSec": 269.23
      },
      {
        "text": "you",
        "startSec": 269.28,
        "endSec": 269.51
      },
      {
        "text": "want",
        "startSec": 269.56,
        "endSec": 269.78
      },
      {
        "text": "to",
        "startSec": 269.83,
        "endSec": 270.06
      },
      {
        "text": "understand",
        "startSec": 270.11,
        "endSec": 270.34
      },
      {
        "text": "all",
        "startSec": 270.39,
        "endSec": 270.62
      },
      {
        "text": "types",
        "startSec": 270.67,
        "endSec": 270.89
      },
      {
        "text": "of",
        "startSec": 270.94,
        "endSec": 271.17
      },
      {
        "text": "keys",
        "startSec": 271.22,
        "endSec": 271.45
      },
      {
        "text": "in",
        "startSec": 271.5,
        "endSec": 271.73
      },
      {
        "text": "a",
        "startSec": 271.78,
        "endSec": 272.01
      },
      {
        "text": "DBMS,",
        "startSec": 272.06,
        "endSec": 272.28
      },
      {
        "text": "you",
        "startSec": 272.33,
        "endSec": 272.56
      },
      {
        "text": "can",
        "startSec": 272.61,
        "endSec": 272.84
      },
      {
        "text": "refer",
        "startSec": 272.89,
        "endSec": 273.12
      },
      {
        "text": "to",
        "startSec": 273.17,
        "endSec": 273.39
      },
      {
        "text": "this",
        "startSec": 273.44,
        "endSec": 273.67
      },
      {
        "text": "video.",
        "startSec": 273.72,
        "endSec": 273.95
      }
    ]
  },
  {
    "id": "sql-seg-46",
    "title": "46. Next, we have Indexes,...",
    "startSec": 274,
    "endSec": 281,
    "text": "Next, we have Indexes, that are database objects  used to speed up data retrieval. They allow the",
    "words": [
      {
        "text": "Next,",
        "startSec": 274,
        "endSec": 274.36
      },
      {
        "text": "we",
        "startSec": 274.41,
        "endSec": 274.77
      },
      {
        "text": "have",
        "startSec": 274.82,
        "endSec": 275.19
      },
      {
        "text": "Indexes,",
        "startSec": 275.24,
        "endSec": 275.6
      },
      {
        "text": "that",
        "startSec": 275.65,
        "endSec": 276.01
      },
      {
        "text": "are",
        "startSec": 276.06,
        "endSec": 276.42
      },
      {
        "text": "database",
        "startSec": 276.47,
        "endSec": 276.83
      },
      {
        "text": "objects",
        "startSec": 276.88,
        "endSec": 277.24
      },
      {
        "text": "used",
        "startSec": 277.29,
        "endSec": 277.66
      },
      {
        "text": "to",
        "startSec": 277.71,
        "endSec": 278.07
      },
      {
        "text": "speed",
        "startSec": 278.12,
        "endSec": 278.48
      },
      {
        "text": "up",
        "startSec": 278.53,
        "endSec": 278.89
      },
      {
        "text": "data",
        "startSec": 278.94,
        "endSec": 279.3
      },
      {
        "text": "retrieval.",
        "startSec": 279.35,
        "endSec": 279.71
      },
      {
        "text": "They",
        "startSec": 279.76,
        "endSec": 280.13
      },
      {
        "text": "allow",
        "startSec": 280.18,
        "endSec": 280.54
      },
      {
        "text": "the",
        "startSec": 280.59,
        "endSec": 280.95
      }
    ]
  },
  {
    "id": "sql-seg-47",
    "title": "47. database system to find...",
    "startSec": 281,
    "endSec": 287,
    "text": "database system to find and access data more  quickly, especially for large tables. And as",
    "words": [
      {
        "text": "database",
        "startSec": 281,
        "endSec": 281.35
      },
      {
        "text": "system",
        "startSec": 281.4,
        "endSec": 281.75
      },
      {
        "text": "to",
        "startSec": 281.8,
        "endSec": 282.15
      },
      {
        "text": "find",
        "startSec": 282.2,
        "endSec": 282.55
      },
      {
        "text": "and",
        "startSec": 282.6,
        "endSec": 282.95
      },
      {
        "text": "access",
        "startSec": 283,
        "endSec": 283.35
      },
      {
        "text": "data",
        "startSec": 283.4,
        "endSec": 283.75
      },
      {
        "text": "more",
        "startSec": 283.8,
        "endSec": 284.15
      },
      {
        "text": "quickly,",
        "startSec": 284.2,
        "endSec": 284.55
      },
      {
        "text": "especially",
        "startSec": 284.6,
        "endSec": 284.95
      },
      {
        "text": "for",
        "startSec": 285,
        "endSec": 285.35
      },
      {
        "text": "large",
        "startSec": 285.4,
        "endSec": 285.75
      },
      {
        "text": "tables.",
        "startSec": 285.8,
        "endSec": 286.15
      },
      {
        "text": "And",
        "startSec": 286.2,
        "endSec": 286.55
      },
      {
        "text": "as",
        "startSec": 286.6,
        "endSec": 286.95
      }
    ]
  },
  {
    "id": "sql-seg-48",
    "title": "48. you must already know,...",
    "startSec": 287,
    "endSec": 292,
    "text": "you must already know, speed in everything when  it comes to database management… as any database",
    "words": [
      {
        "text": "you",
        "startSec": 287,
        "endSec": 287.26
      },
      {
        "text": "must",
        "startSec": 287.31,
        "endSec": 287.57
      },
      {
        "text": "already",
        "startSec": 287.63,
        "endSec": 287.89
      },
      {
        "text": "know,",
        "startSec": 287.94,
        "endSec": 288.2
      },
      {
        "text": "speed",
        "startSec": 288.25,
        "endSec": 288.51
      },
      {
        "text": "in",
        "startSec": 288.56,
        "endSec": 288.82
      },
      {
        "text": "everything",
        "startSec": 288.88,
        "endSec": 289.14
      },
      {
        "text": "when",
        "startSec": 289.19,
        "endSec": 289.45
      },
      {
        "text": "it",
        "startSec": 289.5,
        "endSec": 289.76
      },
      {
        "text": "comes",
        "startSec": 289.81,
        "endSec": 290.07
      },
      {
        "text": "to",
        "startSec": 290.13,
        "endSec": 290.39
      },
      {
        "text": "database",
        "startSec": 290.44,
        "endSec": 290.7
      },
      {
        "text": "management…",
        "startSec": 290.75,
        "endSec": 291.01
      },
      {
        "text": "as",
        "startSec": 291.06,
        "endSec": 291.32
      },
      {
        "text": "any",
        "startSec": 291.38,
        "endSec": 291.64
      },
      {
        "text": "database",
        "startSec": 291.69,
        "endSec": 291.95
      }
    ]
  },
  {
    "id": "sql-seg-49",
    "title": "49. needs to perform a...",
    "startSec": 292,
    "endSec": 299,
    "text": "needs to perform a certain set of functions, most  common ones are aggregate functions like SUM, AVG,",
    "words": [
      {
        "text": "needs",
        "startSec": 292,
        "endSec": 292.36
      },
      {
        "text": "to",
        "startSec": 292.41,
        "endSec": 292.77
      },
      {
        "text": "perform",
        "startSec": 292.82,
        "endSec": 293.19
      },
      {
        "text": "a",
        "startSec": 293.24,
        "endSec": 293.6
      },
      {
        "text": "certain",
        "startSec": 293.65,
        "endSec": 294.01
      },
      {
        "text": "set",
        "startSec": 294.06,
        "endSec": 294.42
      },
      {
        "text": "of",
        "startSec": 294.47,
        "endSec": 294.83
      },
      {
        "text": "functions,",
        "startSec": 294.88,
        "endSec": 295.24
      },
      {
        "text": "most",
        "startSec": 295.29,
        "endSec": 295.66
      },
      {
        "text": "common",
        "startSec": 295.71,
        "endSec": 296.07
      },
      {
        "text": "ones",
        "startSec": 296.12,
        "endSec": 296.48
      },
      {
        "text": "are",
        "startSec": 296.53,
        "endSec": 296.89
      },
      {
        "text": "aggregate",
        "startSec": 296.94,
        "endSec": 297.3
      },
      {
        "text": "functions",
        "startSec": 297.35,
        "endSec": 297.71
      },
      {
        "text": "like",
        "startSec": 297.76,
        "endSec": 298.13
      },
      {
        "text": "SUM,",
        "startSec": 298.18,
        "endSec": 298.54
      },
      {
        "text": "AVG,",
        "startSec": 298.59,
        "endSec": 298.95
      }
    ]
  },
  {
    "id": "sql-seg-50",
    "title": "50. COUNT, MIN, and MAX...",
    "startSec": 299,
    "endSec": 307,
    "text": "COUNT, MIN, and MAX to perform calculations  on sets of data, returning a single result.",
    "words": [
      {
        "text": "COUNT,",
        "startSec": 299,
        "endSec": 299.48
      },
      {
        "text": "MIN,",
        "startSec": 299.53,
        "endSec": 300.02
      },
      {
        "text": "and",
        "startSec": 300.07,
        "endSec": 300.55
      },
      {
        "text": "MAX",
        "startSec": 300.6,
        "endSec": 301.08
      },
      {
        "text": "to",
        "startSec": 301.13,
        "endSec": 301.62
      },
      {
        "text": "perform",
        "startSec": 301.67,
        "endSec": 302.15
      },
      {
        "text": "calculations",
        "startSec": 302.2,
        "endSec": 302.68
      },
      {
        "text": "on",
        "startSec": 302.73,
        "endSec": 303.22
      },
      {
        "text": "sets",
        "startSec": 303.27,
        "endSec": 303.75
      },
      {
        "text": "of",
        "startSec": 303.8,
        "endSec": 304.28
      },
      {
        "text": "data,",
        "startSec": 304.33,
        "endSec": 304.82
      },
      {
        "text": "returning",
        "startSec": 304.87,
        "endSec": 305.35
      },
      {
        "text": "a",
        "startSec": 305.4,
        "endSec": 305.88
      },
      {
        "text": "single",
        "startSec": 305.93,
        "endSec": 306.42
      },
      {
        "text": "result.",
        "startSec": 306.47,
        "endSec": 306.95
      }
    ]
  },
  {
    "id": "sql-seg-51",
    "title": "51. Group By: Here, a GROUP BY...",
    "startSec": 307,
    "endSec": 313,
    "text": "Here, a GROUP BY clause is usually used in  conjunction with aggregate functions to group",
    "words": [
      {
        "text": "Here,",
        "startSec": 307,
        "endSec": 307.35
      },
      {
        "text": "a",
        "startSec": 307.4,
        "endSec": 307.75
      },
      {
        "text": "GROUP",
        "startSec": 307.8,
        "endSec": 308.15
      },
      {
        "text": "BY",
        "startSec": 308.2,
        "endSec": 308.55
      },
      {
        "text": "clause",
        "startSec": 308.6,
        "endSec": 308.95
      },
      {
        "text": "is",
        "startSec": 309,
        "endSec": 309.35
      },
      {
        "text": "usually",
        "startSec": 309.4,
        "endSec": 309.75
      },
      {
        "text": "used",
        "startSec": 309.8,
        "endSec": 310.15
      },
      {
        "text": "in",
        "startSec": 310.2,
        "endSec": 310.55
      },
      {
        "text": "conjunction",
        "startSec": 310.6,
        "endSec": 310.95
      },
      {
        "text": "with",
        "startSec": 311,
        "endSec": 311.35
      },
      {
        "text": "aggregate",
        "startSec": 311.4,
        "endSec": 311.75
      },
      {
        "text": "functions",
        "startSec": 311.8,
        "endSec": 312.15
      },
      {
        "text": "to",
        "startSec": 312.2,
        "endSec": 312.55
      },
      {
        "text": "group",
        "startSec": 312.6,
        "endSec": 312.95
      }
    ]
  },
  {
    "id": "sql-seg-52",
    "title": "52. data based on specific...",
    "startSec": 313,
    "endSec": 319,
    "text": "data based on specific columns. It is typically  used in combination with functions like SUM or",
    "words": [
      {
        "text": "data",
        "startSec": 313,
        "endSec": 313.32
      },
      {
        "text": "based",
        "startSec": 313.38,
        "endSec": 313.7
      },
      {
        "text": "on",
        "startSec": 313.75,
        "endSec": 314.07
      },
      {
        "text": "specific",
        "startSec": 314.13,
        "endSec": 314.45
      },
      {
        "text": "columns.",
        "startSec": 314.5,
        "endSec": 314.82
      },
      {
        "text": "It",
        "startSec": 314.88,
        "endSec": 315.2
      },
      {
        "text": "is",
        "startSec": 315.25,
        "endSec": 315.57
      },
      {
        "text": "typically",
        "startSec": 315.63,
        "endSec": 315.95
      },
      {
        "text": "used",
        "startSec": 316,
        "endSec": 316.32
      },
      {
        "text": "in",
        "startSec": 316.38,
        "endSec": 316.7
      },
      {
        "text": "combination",
        "startSec": 316.75,
        "endSec": 317.07
      },
      {
        "text": "with",
        "startSec": 317.13,
        "endSec": 317.45
      },
      {
        "text": "functions",
        "startSec": 317.5,
        "endSec": 317.82
      },
      {
        "text": "like",
        "startSec": 317.88,
        "endSec": 318.2
      },
      {
        "text": "SUM",
        "startSec": 318.25,
        "endSec": 318.57
      },
      {
        "text": "or",
        "startSec": 318.63,
        "endSec": 318.95
      }
    ]
  },
  {
    "id": "sql-seg-53",
    "title": "53. COUNT to get summary...",
    "startSec": 319,
    "endSec": 326,
    "text": "COUNT to get summary results. Here’s a  sample syntax for your understanding,",
    "words": [
      {
        "text": "COUNT",
        "startSec": 319,
        "endSec": 319.53
      },
      {
        "text": "to",
        "startSec": 319.58,
        "endSec": 320.12
      },
      {
        "text": "get",
        "startSec": 320.17,
        "endSec": 320.7
      },
      {
        "text": "summary",
        "startSec": 320.75,
        "endSec": 321.28
      },
      {
        "text": "results.",
        "startSec": 321.33,
        "endSec": 321.87
      },
      {
        "text": "Here’s",
        "startSec": 321.92,
        "endSec": 322.45
      },
      {
        "text": "a",
        "startSec": 322.5,
        "endSec": 323.03
      },
      {
        "text": "sample",
        "startSec": 323.08,
        "endSec": 323.62
      },
      {
        "text": "syntax",
        "startSec": 323.67,
        "endSec": 324.2
      },
      {
        "text": "for",
        "startSec": 324.25,
        "endSec": 324.78
      },
      {
        "text": "your",
        "startSec": 324.83,
        "endSec": 325.37
      },
      {
        "text": "understanding,",
        "startSec": 325.42,
        "endSec": 325.95
      }
    ]
  },
  {
    "id": "sql-seg-54",
    "title": "54. Here, SELECT: Specifies the...",
    "startSec": 326,
    "endSec": 331,
    "text": "Here, SELECT: Specifies the columns to be  retrieved in the result. column1: is the column",
    "words": [
      {
        "text": "Here,",
        "startSec": 326,
        "endSec": 326.28
      },
      {
        "text": "SELECT:",
        "startSec": 326.33,
        "endSec": 326.62
      },
      {
        "text": "Specifies",
        "startSec": 326.67,
        "endSec": 326.95
      },
      {
        "text": "the",
        "startSec": 327,
        "endSec": 327.28
      },
      {
        "text": "columns",
        "startSec": 327.33,
        "endSec": 327.62
      },
      {
        "text": "to",
        "startSec": 327.67,
        "endSec": 327.95
      },
      {
        "text": "be",
        "startSec": 328,
        "endSec": 328.28
      },
      {
        "text": "retrieved",
        "startSec": 328.33,
        "endSec": 328.62
      },
      {
        "text": "in",
        "startSec": 328.67,
        "endSec": 328.95
      },
      {
        "text": "the",
        "startSec": 329,
        "endSec": 329.28
      },
      {
        "text": "result.",
        "startSec": 329.33,
        "endSec": 329.62
      },
      {
        "text": "column1:",
        "startSec": 329.67,
        "endSec": 329.95
      },
      {
        "text": "is",
        "startSec": 330,
        "endSec": 330.28
      },
      {
        "text": "the",
        "startSec": 330.33,
        "endSec": 330.62
      },
      {
        "text": "column",
        "startSec": 330.67,
        "endSec": 330.95
      }
    ]
  },
  {
    "id": "sql-seg-55",
    "title": "55. you want to group...",
    "startSec": 331,
    "endSec": 336,
    "text": "you want to group by. This can be any column in  the table. SUM(column2): The aggregate function",
    "words": [
      {
        "text": "you",
        "startSec": 331,
        "endSec": 331.24
      },
      {
        "text": "want",
        "startSec": 331.29,
        "endSec": 331.54
      },
      {
        "text": "to",
        "startSec": 331.59,
        "endSec": 331.83
      },
      {
        "text": "group",
        "startSec": 331.88,
        "endSec": 332.13
      },
      {
        "text": "by.",
        "startSec": 332.18,
        "endSec": 332.42
      },
      {
        "text": "This",
        "startSec": 332.47,
        "endSec": 332.71
      },
      {
        "text": "can",
        "startSec": 332.76,
        "endSec": 333.01
      },
      {
        "text": "be",
        "startSec": 333.06,
        "endSec": 333.3
      },
      {
        "text": "any",
        "startSec": 333.35,
        "endSec": 333.6
      },
      {
        "text": "column",
        "startSec": 333.65,
        "endSec": 333.89
      },
      {
        "text": "in",
        "startSec": 333.94,
        "endSec": 334.19
      },
      {
        "text": "the",
        "startSec": 334.24,
        "endSec": 334.48
      },
      {
        "text": "table.",
        "startSec": 334.53,
        "endSec": 334.77
      },
      {
        "text": "SUM(column2):",
        "startSec": 334.82,
        "endSec": 335.07
      },
      {
        "text": "The",
        "startSec": 335.12,
        "endSec": 335.36
      },
      {
        "text": "aggregate",
        "startSec": 335.41,
        "endSec": 335.66
      },
      {
        "text": "function",
        "startSec": 335.71,
        "endSec": 335.95
      }
    ]
  },
  {
    "id": "sql-seg-56",
    "title": "56. SUM calculates the total...",
    "startSec": 336,
    "endSec": 344,
    "text": "SUM calculates the total of values in column2 for  each group. table_name: The name of the table you",
    "words": [
      {
        "text": "SUM",
        "startSec": 336,
        "endSec": 336.39
      },
      {
        "text": "calculates",
        "startSec": 336.44,
        "endSec": 336.84
      },
      {
        "text": "the",
        "startSec": 336.89,
        "endSec": 337.28
      },
      {
        "text": "total",
        "startSec": 337.33,
        "endSec": 337.73
      },
      {
        "text": "of",
        "startSec": 337.78,
        "endSec": 338.17
      },
      {
        "text": "values",
        "startSec": 338.22,
        "endSec": 338.62
      },
      {
        "text": "in",
        "startSec": 338.67,
        "endSec": 339.06
      },
      {
        "text": "column2",
        "startSec": 339.11,
        "endSec": 339.51
      },
      {
        "text": "for",
        "startSec": 339.56,
        "endSec": 339.95
      },
      {
        "text": "each",
        "startSec": 340,
        "endSec": 340.39
      },
      {
        "text": "group.",
        "startSec": 340.44,
        "endSec": 340.84
      },
      {
        "text": "table_name:",
        "startSec": 340.89,
        "endSec": 341.28
      },
      {
        "text": "The",
        "startSec": 341.33,
        "endSec": 341.73
      },
      {
        "text": "name",
        "startSec": 341.78,
        "endSec": 342.17
      },
      {
        "text": "of",
        "startSec": 342.22,
        "endSec": 342.62
      },
      {
        "text": "the",
        "startSec": 342.67,
        "endSec": 343.06
      },
      {
        "text": "table",
        "startSec": 343.11,
        "endSec": 343.51
      },
      {
        "text": "you",
        "startSec": 343.56,
        "endSec": 343.95
      }
    ]
  },
  {
    "id": "sql-seg-57",
    "title": "57. are querying. One thing...",
    "startSec": 344,
    "endSec": 349,
    "text": "are querying. One thing you should remember  is that when you use the GROUP BY clause, the",
    "words": [
      {
        "text": "are",
        "startSec": 344,
        "endSec": 344.24
      },
      {
        "text": "querying.",
        "startSec": 344.29,
        "endSec": 344.54
      },
      {
        "text": "One",
        "startSec": 344.59,
        "endSec": 344.83
      },
      {
        "text": "thing",
        "startSec": 344.88,
        "endSec": 345.13
      },
      {
        "text": "you",
        "startSec": 345.18,
        "endSec": 345.42
      },
      {
        "text": "should",
        "startSec": 345.47,
        "endSec": 345.71
      },
      {
        "text": "remember",
        "startSec": 345.76,
        "endSec": 346.01
      },
      {
        "text": "is",
        "startSec": 346.06,
        "endSec": 346.3
      },
      {
        "text": "that",
        "startSec": 346.35,
        "endSec": 346.6
      },
      {
        "text": "when",
        "startSec": 346.65,
        "endSec": 346.89
      },
      {
        "text": "you",
        "startSec": 346.94,
        "endSec": 347.19
      },
      {
        "text": "use",
        "startSec": 347.24,
        "endSec": 347.48
      },
      {
        "text": "the",
        "startSec": 347.53,
        "endSec": 347.77
      },
      {
        "text": "GROUP",
        "startSec": 347.82,
        "endSec": 348.07
      },
      {
        "text": "BY",
        "startSec": 348.12,
        "endSec": 348.36
      },
      {
        "text": "clause,",
        "startSec": 348.41,
        "endSec": 348.66
      },
      {
        "text": "the",
        "startSec": 348.71,
        "endSec": 348.95
      }
    ]
  },
  {
    "id": "sql-seg-58",
    "title": "58. SELECT statement should include...",
    "startSec": 349,
    "endSec": 355,
    "text": "SELECT statement should include either the columns  used for grouping or the aggregate functions used",
    "words": [
      {
        "text": "SELECT",
        "startSec": 349,
        "endSec": 349.35
      },
      {
        "text": "statement",
        "startSec": 349.4,
        "endSec": 349.75
      },
      {
        "text": "should",
        "startSec": 349.8,
        "endSec": 350.15
      },
      {
        "text": "include",
        "startSec": 350.2,
        "endSec": 350.55
      },
      {
        "text": "either",
        "startSec": 350.6,
        "endSec": 350.95
      },
      {
        "text": "the",
        "startSec": 351,
        "endSec": 351.35
      },
      {
        "text": "columns",
        "startSec": 351.4,
        "endSec": 351.75
      },
      {
        "text": "used",
        "startSec": 351.8,
        "endSec": 352.15
      },
      {
        "text": "for",
        "startSec": 352.2,
        "endSec": 352.55
      },
      {
        "text": "grouping",
        "startSec": 352.6,
        "endSec": 352.95
      },
      {
        "text": "or",
        "startSec": 353,
        "endSec": 353.35
      },
      {
        "text": "the",
        "startSec": 353.4,
        "endSec": 353.75
      },
      {
        "text": "aggregate",
        "startSec": 353.8,
        "endSec": 354.15
      },
      {
        "text": "functions",
        "startSec": 354.2,
        "endSec": 354.55
      },
      {
        "text": "used",
        "startSec": 354.6,
        "endSec": 354.95
      }
    ]
  },
  {
    "id": "sql-seg-59",
    "title": "59. AutoBuy: to calculate values within...",
    "startSec": 355,
    "endSec": 361,
    "text": "to calculate values within each group. Next,  there’s another clause called ORDER BY which",
    "words": [
      {
        "text": "to",
        "startSec": 355,
        "endSec": 355.38
      },
      {
        "text": "calculate",
        "startSec": 355.43,
        "endSec": 355.81
      },
      {
        "text": "values",
        "startSec": 355.86,
        "endSec": 356.24
      },
      {
        "text": "within",
        "startSec": 356.29,
        "endSec": 356.66
      },
      {
        "text": "each",
        "startSec": 356.71,
        "endSec": 357.09
      },
      {
        "text": "group.",
        "startSec": 357.14,
        "endSec": 357.52
      },
      {
        "text": "Next,",
        "startSec": 357.57,
        "endSec": 357.95
      },
      {
        "text": "there’s",
        "startSec": 358,
        "endSec": 358.38
      },
      {
        "text": "another",
        "startSec": 358.43,
        "endSec": 358.81
      },
      {
        "text": "clause",
        "startSec": 358.86,
        "endSec": 359.24
      },
      {
        "text": "called",
        "startSec": 359.29,
        "endSec": 359.66
      },
      {
        "text": "ORDER",
        "startSec": 359.71,
        "endSec": 360.09
      },
      {
        "text": "BY",
        "startSec": 360.14,
        "endSec": 360.52
      },
      {
        "text": "which",
        "startSec": 360.57,
        "endSec": 360.95
      }
    ]
  },
  {
    "id": "sql-seg-60",
    "title": "60. is used to sort...",
    "startSec": 361,
    "endSec": 367,
    "text": "is used to sort the result set in ascending or  descending order based on one or more columns.",
    "words": [
      {
        "text": "is",
        "startSec": 361,
        "endSec": 361.28
      },
      {
        "text": "used",
        "startSec": 361.33,
        "endSec": 361.62
      },
      {
        "text": "to",
        "startSec": 361.67,
        "endSec": 361.95
      },
      {
        "text": "sort",
        "startSec": 362,
        "endSec": 362.28
      },
      {
        "text": "the",
        "startSec": 362.33,
        "endSec": 362.62
      },
      {
        "text": "result",
        "startSec": 362.67,
        "endSec": 362.95
      },
      {
        "text": "set",
        "startSec": 363,
        "endSec": 363.28
      },
      {
        "text": "in",
        "startSec": 363.33,
        "endSec": 363.62
      },
      {
        "text": "ascending",
        "startSec": 363.67,
        "endSec": 363.95
      },
      {
        "text": "or",
        "startSec": 364,
        "endSec": 364.28
      },
      {
        "text": "descending",
        "startSec": 364.33,
        "endSec": 364.62
      },
      {
        "text": "order",
        "startSec": 364.67,
        "endSec": 364.95
      },
      {
        "text": "based",
        "startSec": 365,
        "endSec": 365.28
      },
      {
        "text": "on",
        "startSec": 365.33,
        "endSec": 365.62
      },
      {
        "text": "one",
        "startSec": 365.67,
        "endSec": 365.95
      },
      {
        "text": "or",
        "startSec": 366,
        "endSec": 366.28
      },
      {
        "text": "more",
        "startSec": 366.33,
        "endSec": 366.62
      },
      {
        "text": "columns.",
        "startSec": 366.67,
        "endSec": 366.95
      }
    ]
  },
  {
    "id": "sql-seg-61",
    "title": "61. And when combined with...",
    "startSec": 367,
    "endSec": 373,
    "text": "And when combined with an aggregate function like  COUNT(), it allows us to sort the result based on",
    "words": [
      {
        "text": "And",
        "startSec": 367,
        "endSec": 367.28
      },
      {
        "text": "when",
        "startSec": 367.33,
        "endSec": 367.62
      },
      {
        "text": "combined",
        "startSec": 367.67,
        "endSec": 367.95
      },
      {
        "text": "with",
        "startSec": 368,
        "endSec": 368.28
      },
      {
        "text": "an",
        "startSec": 368.33,
        "endSec": 368.62
      },
      {
        "text": "aggregate",
        "startSec": 368.67,
        "endSec": 368.95
      },
      {
        "text": "function",
        "startSec": 369,
        "endSec": 369.28
      },
      {
        "text": "like",
        "startSec": 369.33,
        "endSec": 369.62
      },
      {
        "text": "COUNT(),",
        "startSec": 369.67,
        "endSec": 369.95
      },
      {
        "text": "it",
        "startSec": 370,
        "endSec": 370.28
      },
      {
        "text": "allows",
        "startSec": 370.33,
        "endSec": 370.62
      },
      {
        "text": "us",
        "startSec": 370.67,
        "endSec": 370.95
      },
      {
        "text": "to",
        "startSec": 371,
        "endSec": 371.28
      },
      {
        "text": "sort",
        "startSec": 371.33,
        "endSec": 371.62
      },
      {
        "text": "the",
        "startSec": 371.67,
        "endSec": 371.95
      },
      {
        "text": "result",
        "startSec": 372,
        "endSec": 372.28
      },
      {
        "text": "based",
        "startSec": 372.33,
        "endSec": 372.62
      },
      {
        "text": "on",
        "startSec": 372.67,
        "endSec": 372.95
      }
    ]
  },
  {
    "id": "sql-seg-62",
    "title": "62. the count of occurrences...",
    "startSec": 373,
    "endSec": 380,
    "text": "the count of occurrences of a specific value  or the number of rows returned for each group.",
    "words": [
      {
        "text": "the",
        "startSec": 373,
        "endSec": 373.36
      },
      {
        "text": "count",
        "startSec": 373.41,
        "endSec": 373.77
      },
      {
        "text": "of",
        "startSec": 373.82,
        "endSec": 374.19
      },
      {
        "text": "occurrences",
        "startSec": 374.24,
        "endSec": 374.6
      },
      {
        "text": "of",
        "startSec": 374.65,
        "endSec": 375.01
      },
      {
        "text": "a",
        "startSec": 375.06,
        "endSec": 375.42
      },
      {
        "text": "specific",
        "startSec": 375.47,
        "endSec": 375.83
      },
      {
        "text": "value",
        "startSec": 375.88,
        "endSec": 376.24
      },
      {
        "text": "or",
        "startSec": 376.29,
        "endSec": 376.66
      },
      {
        "text": "the",
        "startSec": 376.71,
        "endSec": 377.07
      },
      {
        "text": "number",
        "startSec": 377.12,
        "endSec": 377.48
      },
      {
        "text": "of",
        "startSec": 377.53,
        "endSec": 377.89
      },
      {
        "text": "rows",
        "startSec": 377.94,
        "endSec": 378.3
      },
      {
        "text": "returned",
        "startSec": 378.35,
        "endSec": 378.71
      },
      {
        "text": "for",
        "startSec": 378.76,
        "endSec": 379.13
      },
      {
        "text": "each",
        "startSec": 379.18,
        "endSec": 379.54
      },
      {
        "text": "group.",
        "startSec": 379.59,
        "endSec": 379.95
      }
    ]
  },
  {
    "id": "sql-seg-63",
    "title": "63. Here’s an example syntax,...",
    "startSec": 380,
    "endSec": 387,
    "text": "Here’s an example syntax, Here, SELECT: Specifies  the columns you want to retrieve from the table,",
    "words": [
      {
        "text": "Here’s",
        "startSec": 380,
        "endSec": 380.39
      },
      {
        "text": "an",
        "startSec": 380.44,
        "endSec": 380.82
      },
      {
        "text": "example",
        "startSec": 380.88,
        "endSec": 381.26
      },
      {
        "text": "syntax,",
        "startSec": 381.31,
        "endSec": 381.7
      },
      {
        "text": "Here,",
        "startSec": 381.75,
        "endSec": 382.14
      },
      {
        "text": "SELECT:",
        "startSec": 382.19,
        "endSec": 382.57
      },
      {
        "text": "Specifies",
        "startSec": 382.63,
        "endSec": 383.01
      },
      {
        "text": "the",
        "startSec": 383.06,
        "endSec": 383.45
      },
      {
        "text": "columns",
        "startSec": 383.5,
        "endSec": 383.89
      },
      {
        "text": "you",
        "startSec": 383.94,
        "endSec": 384.32
      },
      {
        "text": "want",
        "startSec": 384.38,
        "endSec": 384.76
      },
      {
        "text": "to",
        "startSec": 384.81,
        "endSec": 385.2
      },
      {
        "text": "retrieve",
        "startSec": 385.25,
        "endSec": 385.64
      },
      {
        "text": "from",
        "startSec": 385.69,
        "endSec": 386.07
      },
      {
        "text": "the",
        "startSec": 386.13,
        "endSec": 386.51
      },
      {
        "text": "table,",
        "startSec": 386.56,
        "endSec": 386.95
      }
    ]
  },
  {
    "id": "sql-seg-64",
    "title": "64. including the column you...",
    "startSec": 387,
    "endSec": 393,
    "text": "including the column you want to count occurrences  of. COUNT(column_name): counts the occurrences of",
    "words": [
      {
        "text": "including",
        "startSec": 387,
        "endSec": 387.38
      },
      {
        "text": "the",
        "startSec": 387.43,
        "endSec": 387.81
      },
      {
        "text": "column",
        "startSec": 387.86,
        "endSec": 388.24
      },
      {
        "text": "you",
        "startSec": 388.29,
        "endSec": 388.66
      },
      {
        "text": "want",
        "startSec": 388.71,
        "endSec": 389.09
      },
      {
        "text": "to",
        "startSec": 389.14,
        "endSec": 389.52
      },
      {
        "text": "count",
        "startSec": 389.57,
        "endSec": 389.95
      },
      {
        "text": "occurrences",
        "startSec": 390,
        "endSec": 390.38
      },
      {
        "text": "of.",
        "startSec": 390.43,
        "endSec": 390.81
      },
      {
        "text": "COUNT(column_name):",
        "startSec": 390.86,
        "endSec": 391.24
      },
      {
        "text": "counts",
        "startSec": 391.29,
        "endSec": 391.66
      },
      {
        "text": "the",
        "startSec": 391.71,
        "endSec": 392.09
      },
      {
        "text": "occurrences",
        "startSec": 392.14,
        "endSec": 392.52
      },
      {
        "text": "of",
        "startSec": 392.57,
        "endSec": 392.95
      }
    ]
  },
  {
    "id": "sql-seg-65",
    "title": "65. the specified column values....",
    "startSec": 393,
    "endSec": 400,
    "text": "the specified column values. You can also use  COUNT(*) to count the total number of rows in",
    "words": [
      {
        "text": "the",
        "startSec": 393,
        "endSec": 393.36
      },
      {
        "text": "specified",
        "startSec": 393.41,
        "endSec": 393.77
      },
      {
        "text": "column",
        "startSec": 393.82,
        "endSec": 394.19
      },
      {
        "text": "values.",
        "startSec": 394.24,
        "endSec": 394.6
      },
      {
        "text": "You",
        "startSec": 394.65,
        "endSec": 395.01
      },
      {
        "text": "can",
        "startSec": 395.06,
        "endSec": 395.42
      },
      {
        "text": "also",
        "startSec": 395.47,
        "endSec": 395.83
      },
      {
        "text": "use",
        "startSec": 395.88,
        "endSec": 396.24
      },
      {
        "text": "COUNT(*)",
        "startSec": 396.29,
        "endSec": 396.66
      },
      {
        "text": "to",
        "startSec": 396.71,
        "endSec": 397.07
      },
      {
        "text": "count",
        "startSec": 397.12,
        "endSec": 397.48
      },
      {
        "text": "the",
        "startSec": 397.53,
        "endSec": 397.89
      },
      {
        "text": "total",
        "startSec": 397.94,
        "endSec": 398.3
      },
      {
        "text": "number",
        "startSec": 398.35,
        "endSec": 398.71
      },
      {
        "text": "of",
        "startSec": 398.76,
        "endSec": 399.13
      },
      {
        "text": "rows",
        "startSec": 399.18,
        "endSec": 399.54
      },
      {
        "text": "in",
        "startSec": 399.59,
        "endSec": 399.95
      }
    ]
  },
  {
    "id": "sql-seg-66",
    "title": "66. each group. AS count_alias:...",
    "startSec": 400,
    "endSec": 405,
    "text": "each group. AS count_alias: is somewhat  of an optional part. It allows you to",
    "words": [
      {
        "text": "each",
        "startSec": 400,
        "endSec": 400.31
      },
      {
        "text": "group.",
        "startSec": 400.36,
        "endSec": 400.66
      },
      {
        "text": "AS",
        "startSec": 400.71,
        "endSec": 401.02
      },
      {
        "text": "count_alias:",
        "startSec": 401.07,
        "endSec": 401.38
      },
      {
        "text": "is",
        "startSec": 401.43,
        "endSec": 401.74
      },
      {
        "text": "somewhat",
        "startSec": 401.79,
        "endSec": 402.09
      },
      {
        "text": "of",
        "startSec": 402.14,
        "endSec": 402.45
      },
      {
        "text": "an",
        "startSec": 402.5,
        "endSec": 402.81
      },
      {
        "text": "optional",
        "startSec": 402.86,
        "endSec": 403.16
      },
      {
        "text": "part.",
        "startSec": 403.21,
        "endSec": 403.52
      },
      {
        "text": "It",
        "startSec": 403.57,
        "endSec": 403.88
      },
      {
        "text": "allows",
        "startSec": 403.93,
        "endSec": 404.24
      },
      {
        "text": "you",
        "startSec": 404.29,
        "endSec": 404.59
      },
      {
        "text": "to",
        "startSec": 404.64,
        "endSec": 404.95
      }
    ]
  },
  {
    "id": "sql-seg-67",
    "title": "67. provide an alias (a.k.a...",
    "startSec": 405,
    "endSec": 411,
    "text": "provide an alias (a.k.a a custom name) for the  count result, making the output more readable.",
    "words": [
      {
        "text": "provide",
        "startSec": 405,
        "endSec": 405.32
      },
      {
        "text": "an",
        "startSec": 405.38,
        "endSec": 405.7
      },
      {
        "text": "alias",
        "startSec": 405.75,
        "endSec": 406.07
      },
      {
        "text": "(a.k.a",
        "startSec": 406.13,
        "endSec": 406.45
      },
      {
        "text": "a",
        "startSec": 406.5,
        "endSec": 406.82
      },
      {
        "text": "custom",
        "startSec": 406.88,
        "endSec": 407.2
      },
      {
        "text": "name)",
        "startSec": 407.25,
        "endSec": 407.57
      },
      {
        "text": "for",
        "startSec": 407.63,
        "endSec": 407.95
      },
      {
        "text": "the",
        "startSec": 408,
        "endSec": 408.32
      },
      {
        "text": "count",
        "startSec": 408.38,
        "endSec": 408.7
      },
      {
        "text": "result,",
        "startSec": 408.75,
        "endSec": 409.07
      },
      {
        "text": "making",
        "startSec": 409.13,
        "endSec": 409.45
      },
      {
        "text": "the",
        "startSec": 409.5,
        "endSec": 409.82
      },
      {
        "text": "output",
        "startSec": 409.88,
        "endSec": 410.2
      },
      {
        "text": "more",
        "startSec": 410.25,
        "endSec": 410.57
      },
      {
        "text": "readable.",
        "startSec": 410.63,
        "endSec": 410.95
      }
    ]
  },
  {
    "id": "sql-seg-68",
    "title": "68. FROM table_name: Specifies the...",
    "startSec": 411,
    "endSec": 417,
    "text": "FROM table_name: Specifies the name of the table  from which you are retrieving the data from.",
    "words": [
      {
        "text": "FROM",
        "startSec": 411,
        "endSec": 411.32
      },
      {
        "text": "table_name:",
        "startSec": 411.38,
        "endSec": 411.7
      },
      {
        "text": "Specifies",
        "startSec": 411.75,
        "endSec": 412.07
      },
      {
        "text": "the",
        "startSec": 412.13,
        "endSec": 412.45
      },
      {
        "text": "name",
        "startSec": 412.5,
        "endSec": 412.82
      },
      {
        "text": "of",
        "startSec": 412.88,
        "endSec": 413.2
      },
      {
        "text": "the",
        "startSec": 413.25,
        "endSec": 413.57
      },
      {
        "text": "table",
        "startSec": 413.63,
        "endSec": 413.95
      },
      {
        "text": "from",
        "startSec": 414,
        "endSec": 414.32
      },
      {
        "text": "which",
        "startSec": 414.38,
        "endSec": 414.7
      },
      {
        "text": "you",
        "startSec": 414.75,
        "endSec": 415.07
      },
      {
        "text": "are",
        "startSec": 415.13,
        "endSec": 415.45
      },
      {
        "text": "retrieving",
        "startSec": 415.5,
        "endSec": 415.82
      },
      {
        "text": "the",
        "startSec": 415.88,
        "endSec": 416.2
      },
      {
        "text": "data",
        "startSec": 416.25,
        "endSec": 416.57
      },
      {
        "text": "from.",
        "startSec": 416.63,
        "endSec": 416.95
      }
    ]
  },
  {
    "id": "sql-seg-69",
    "title": "69. GROUP BY column_name: again,...",
    "startSec": 417,
    "endSec": 423,
    "text": "GROUP BY column_name: again, groups the result set  by the specified column, so the COUNT() function",
    "words": [
      {
        "text": "GROUP",
        "startSec": 417,
        "endSec": 417.32
      },
      {
        "text": "BY",
        "startSec": 417.38,
        "endSec": 417.7
      },
      {
        "text": "column_name:",
        "startSec": 417.75,
        "endSec": 418.07
      },
      {
        "text": "again,",
        "startSec": 418.13,
        "endSec": 418.45
      },
      {
        "text": "groups",
        "startSec": 418.5,
        "endSec": 418.82
      },
      {
        "text": "the",
        "startSec": 418.88,
        "endSec": 419.2
      },
      {
        "text": "result",
        "startSec": 419.25,
        "endSec": 419.57
      },
      {
        "text": "set",
        "startSec": 419.63,
        "endSec": 419.95
      },
      {
        "text": "by",
        "startSec": 420,
        "endSec": 420.32
      },
      {
        "text": "the",
        "startSec": 420.38,
        "endSec": 420.7
      },
      {
        "text": "specified",
        "startSec": 420.75,
        "endSec": 421.07
      },
      {
        "text": "column,",
        "startSec": 421.13,
        "endSec": 421.45
      },
      {
        "text": "so",
        "startSec": 421.5,
        "endSec": 421.82
      },
      {
        "text": "the",
        "startSec": 421.88,
        "endSec": 422.2
      },
      {
        "text": "COUNT()",
        "startSec": 422.25,
        "endSec": 422.57
      },
      {
        "text": "function",
        "startSec": 422.63,
        "endSec": 422.95
      }
    ]
  },
  {
    "id": "sql-seg-70",
    "title": "70. calculates the count for...",
    "startSec": 423,
    "endSec": 431,
    "text": "calculates the count for each group separately.  And lastly, ORDER BY count_alias [ASC | DESC]:",
    "words": [
      {
        "text": "calculates",
        "startSec": 423,
        "endSec": 423.48
      },
      {
        "text": "the",
        "startSec": 423.53,
        "endSec": 424.02
      },
      {
        "text": "count",
        "startSec": 424.07,
        "endSec": 424.55
      },
      {
        "text": "for",
        "startSec": 424.6,
        "endSec": 425.08
      },
      {
        "text": "each",
        "startSec": 425.13,
        "endSec": 425.62
      },
      {
        "text": "group",
        "startSec": 425.67,
        "endSec": 426.15
      },
      {
        "text": "separately.",
        "startSec": 426.2,
        "endSec": 426.68
      },
      {
        "text": "And",
        "startSec": 426.73,
        "endSec": 427.22
      },
      {
        "text": "lastly,",
        "startSec": 427.27,
        "endSec": 427.75
      },
      {
        "text": "ORDER",
        "startSec": 427.8,
        "endSec": 428.28
      },
      {
        "text": "BY",
        "startSec": 428.33,
        "endSec": 428.82
      },
      {
        "text": "count_alias",
        "startSec": 428.87,
        "endSec": 429.35
      },
      {
        "text": "[ASC",
        "startSec": 429.4,
        "endSec": 429.88
      },
      {
        "text": "|",
        "startSec": 429.93,
        "endSec": 430.42
      },
      {
        "text": "DESC]:",
        "startSec": 430.47,
        "endSec": 430.95
      }
    ]
  },
  {
    "id": "sql-seg-71",
    "title": "71. This part sorts the...",
    "startSec": 431,
    "endSec": 438,
    "text": "This part sorts the result set based on the  count value. You can use either ASC (ascending)",
    "words": [
      {
        "text": "This",
        "startSec": 431,
        "endSec": 431.36
      },
      {
        "text": "part",
        "startSec": 431.41,
        "endSec": 431.77
      },
      {
        "text": "sorts",
        "startSec": 431.82,
        "endSec": 432.19
      },
      {
        "text": "the",
        "startSec": 432.24,
        "endSec": 432.6
      },
      {
        "text": "result",
        "startSec": 432.65,
        "endSec": 433.01
      },
      {
        "text": "set",
        "startSec": 433.06,
        "endSec": 433.42
      },
      {
        "text": "based",
        "startSec": 433.47,
        "endSec": 433.83
      },
      {
        "text": "on",
        "startSec": 433.88,
        "endSec": 434.24
      },
      {
        "text": "the",
        "startSec": 434.29,
        "endSec": 434.66
      },
      {
        "text": "count",
        "startSec": 434.71,
        "endSec": 435.07
      },
      {
        "text": "value.",
        "startSec": 435.12,
        "endSec": 435.48
      },
      {
        "text": "You",
        "startSec": 435.53,
        "endSec": 435.89
      },
      {
        "text": "can",
        "startSec": 435.94,
        "endSec": 436.3
      },
      {
        "text": "use",
        "startSec": 436.35,
        "endSec": 436.71
      },
      {
        "text": "either",
        "startSec": 436.76,
        "endSec": 437.13
      },
      {
        "text": "ASC",
        "startSec": 437.18,
        "endSec": 437.54
      },
      {
        "text": "(ascending)",
        "startSec": 437.59,
        "endSec": 437.95
      }
    ]
  },
  {
    "id": "sql-seg-72",
    "title": "72. SubQuery: or DESC (descending) to...",
    "startSec": 438,
    "endSec": 445,
    "text": "or DESC (descending) to specify the sorting  order. Next, there’s the concept of a subquery,",
    "words": [
      {
        "text": "or",
        "startSec": 438,
        "endSec": 438.42
      },
      {
        "text": "DESC",
        "startSec": 438.47,
        "endSec": 438.88
      },
      {
        "text": "(descending)",
        "startSec": 438.93,
        "endSec": 439.35
      },
      {
        "text": "to",
        "startSec": 439.4,
        "endSec": 439.82
      },
      {
        "text": "specify",
        "startSec": 439.87,
        "endSec": 440.28
      },
      {
        "text": "the",
        "startSec": 440.33,
        "endSec": 440.75
      },
      {
        "text": "sorting",
        "startSec": 440.8,
        "endSec": 441.22
      },
      {
        "text": "order.",
        "startSec": 441.27,
        "endSec": 441.68
      },
      {
        "text": "Next,",
        "startSec": 441.73,
        "endSec": 442.15
      },
      {
        "text": "there’s",
        "startSec": 442.2,
        "endSec": 442.62
      },
      {
        "text": "the",
        "startSec": 442.67,
        "endSec": 443.08
      },
      {
        "text": "concept",
        "startSec": 443.13,
        "endSec": 443.55
      },
      {
        "text": "of",
        "startSec": 443.6,
        "endSec": 444.02
      },
      {
        "text": "a",
        "startSec": 444.07,
        "endSec": 444.48
      },
      {
        "text": "subquery,",
        "startSec": 444.53,
        "endSec": 444.95
      }
    ]
  },
  {
    "id": "sql-seg-73",
    "title": "73. which is also known...",
    "startSec": 445,
    "endSec": 451,
    "text": "which is also known as an inner query or nested  query. Fundamentally, by definition, it is a query",
    "words": [
      {
        "text": "which",
        "startSec": 445,
        "endSec": 445.28
      },
      {
        "text": "is",
        "startSec": 445.33,
        "endSec": 445.62
      },
      {
        "text": "also",
        "startSec": 445.67,
        "endSec": 445.95
      },
      {
        "text": "known",
        "startSec": 446,
        "endSec": 446.28
      },
      {
        "text": "as",
        "startSec": 446.33,
        "endSec": 446.62
      },
      {
        "text": "an",
        "startSec": 446.67,
        "endSec": 446.95
      },
      {
        "text": "inner",
        "startSec": 447,
        "endSec": 447.28
      },
      {
        "text": "query",
        "startSec": 447.33,
        "endSec": 447.62
      },
      {
        "text": "or",
        "startSec": 447.67,
        "endSec": 447.95
      },
      {
        "text": "nested",
        "startSec": 448,
        "endSec": 448.28
      },
      {
        "text": "query.",
        "startSec": 448.33,
        "endSec": 448.62
      },
      {
        "text": "Fundamentally,",
        "startSec": 448.67,
        "endSec": 448.95
      },
      {
        "text": "by",
        "startSec": 449,
        "endSec": 449.28
      },
      {
        "text": "definition,",
        "startSec": 449.33,
        "endSec": 449.62
      },
      {
        "text": "it",
        "startSec": 449.67,
        "endSec": 449.95
      },
      {
        "text": "is",
        "startSec": 450,
        "endSec": 450.28
      },
      {
        "text": "a",
        "startSec": 450.33,
        "endSec": 450.62
      },
      {
        "text": "query",
        "startSec": 450.67,
        "endSec": 450.95
      }
    ]
  },
  {
    "id": "sql-seg-74",
    "title": "74. that is embedded within...",
    "startSec": 451,
    "endSec": 458,
    "text": "that is embedded within another query. It is used  to retrieve data that will be used as a filter or",
    "words": [
      {
        "text": "that",
        "startSec": 451,
        "endSec": 451.3
      },
      {
        "text": "is",
        "startSec": 451.35,
        "endSec": 451.65
      },
      {
        "text": "embedded",
        "startSec": 451.7,
        "endSec": 452
      },
      {
        "text": "within",
        "startSec": 452.05,
        "endSec": 452.35
      },
      {
        "text": "another",
        "startSec": 452.4,
        "endSec": 452.7
      },
      {
        "text": "query.",
        "startSec": 452.75,
        "endSec": 453.05
      },
      {
        "text": "It",
        "startSec": 453.1,
        "endSec": 453.4
      },
      {
        "text": "is",
        "startSec": 453.45,
        "endSec": 453.75
      },
      {
        "text": "used",
        "startSec": 453.8,
        "endSec": 454.1
      },
      {
        "text": "to",
        "startSec": 454.15,
        "endSec": 454.45
      },
      {
        "text": "retrieve",
        "startSec": 454.5,
        "endSec": 454.8
      },
      {
        "text": "data",
        "startSec": 454.85,
        "endSec": 455.15
      },
      {
        "text": "that",
        "startSec": 455.2,
        "endSec": 455.5
      },
      {
        "text": "will",
        "startSec": 455.55,
        "endSec": 455.85
      },
      {
        "text": "be",
        "startSec": 455.9,
        "endSec": 456.2
      },
      {
        "text": "used",
        "startSec": 456.25,
        "endSec": 456.55
      },
      {
        "text": "as",
        "startSec": 456.6,
        "endSec": 456.9
      },
      {
        "text": "a",
        "startSec": 456.95,
        "endSec": 457.25
      },
      {
        "text": "filter",
        "startSec": 457.3,
        "endSec": 457.6
      },
      {
        "text": "or",
        "startSec": 457.65,
        "endSec": 457.95
      }
    ]
  },
  {
    "id": "sql-seg-75",
    "title": "75. condition in the main...",
    "startSec": 458,
    "endSec": 464,
    "text": "condition in the main query. More on this in  a separate video, but here’s a sample syntax,",
    "words": [
      {
        "text": "condition",
        "startSec": 458,
        "endSec": 458.3
      },
      {
        "text": "in",
        "startSec": 458.35,
        "endSec": 458.66
      },
      {
        "text": "the",
        "startSec": 458.71,
        "endSec": 459.01
      },
      {
        "text": "main",
        "startSec": 459.06,
        "endSec": 459.36
      },
      {
        "text": "query.",
        "startSec": 459.41,
        "endSec": 459.71
      },
      {
        "text": "More",
        "startSec": 459.76,
        "endSec": 460.07
      },
      {
        "text": "on",
        "startSec": 460.12,
        "endSec": 460.42
      },
      {
        "text": "this",
        "startSec": 460.47,
        "endSec": 460.77
      },
      {
        "text": "in",
        "startSec": 460.82,
        "endSec": 461.13
      },
      {
        "text": "a",
        "startSec": 461.18,
        "endSec": 461.48
      },
      {
        "text": "separate",
        "startSec": 461.53,
        "endSec": 461.83
      },
      {
        "text": "video,",
        "startSec": 461.88,
        "endSec": 462.19
      },
      {
        "text": "but",
        "startSec": 462.24,
        "endSec": 462.54
      },
      {
        "text": "here’s",
        "startSec": 462.59,
        "endSec": 462.89
      },
      {
        "text": "a",
        "startSec": 462.94,
        "endSec": 463.24
      },
      {
        "text": "sample",
        "startSec": 463.29,
        "endSec": 463.6
      },
      {
        "text": "syntax,",
        "startSec": 463.65,
        "endSec": 463.95
      }
    ]
  },
  {
    "id": "sql-seg-76",
    "title": "76. The main advantage of...",
    "startSec": 464,
    "endSec": 469,
    "text": "The main advantage of using a subquery is that  it allows us to perform complex filtering and",
    "words": [
      {
        "text": "The",
        "startSec": 464,
        "endSec": 464.24
      },
      {
        "text": "main",
        "startSec": 464.29,
        "endSec": 464.54
      },
      {
        "text": "advantage",
        "startSec": 464.59,
        "endSec": 464.83
      },
      {
        "text": "of",
        "startSec": 464.88,
        "endSec": 465.13
      },
      {
        "text": "using",
        "startSec": 465.18,
        "endSec": 465.42
      },
      {
        "text": "a",
        "startSec": 465.47,
        "endSec": 465.71
      },
      {
        "text": "subquery",
        "startSec": 465.76,
        "endSec": 466.01
      },
      {
        "text": "is",
        "startSec": 466.06,
        "endSec": 466.3
      },
      {
        "text": "that",
        "startSec": 466.35,
        "endSec": 466.6
      },
      {
        "text": "it",
        "startSec": 466.65,
        "endSec": 466.89
      },
      {
        "text": "allows",
        "startSec": 466.94,
        "endSec": 467.19
      },
      {
        "text": "us",
        "startSec": 467.24,
        "endSec": 467.48
      },
      {
        "text": "to",
        "startSec": 467.53,
        "endSec": 467.77
      },
      {
        "text": "perform",
        "startSec": 467.82,
        "endSec": 468.07
      },
      {
        "text": "complex",
        "startSec": 468.12,
        "endSec": 468.36
      },
      {
        "text": "filtering",
        "startSec": 468.41,
        "endSec": 468.66
      },
      {
        "text": "and",
        "startSec": 468.71,
        "endSec": 468.95
      }
    ]
  },
  {
    "id": "sql-seg-77",
    "title": "77. data retrieval in a...",
    "startSec": 469,
    "endSec": 476,
    "text": "data retrieval in a more organized and efficient  manner. Next, we have Views, which are virtual",
    "words": [
      {
        "text": "data",
        "startSec": 469,
        "endSec": 469.39
      },
      {
        "text": "retrieval",
        "startSec": 469.44,
        "endSec": 469.82
      },
      {
        "text": "in",
        "startSec": 469.88,
        "endSec": 470.26
      },
      {
        "text": "a",
        "startSec": 470.31,
        "endSec": 470.7
      },
      {
        "text": "more",
        "startSec": 470.75,
        "endSec": 471.14
      },
      {
        "text": "organized",
        "startSec": 471.19,
        "endSec": 471.57
      },
      {
        "text": "and",
        "startSec": 471.63,
        "endSec": 472.01
      },
      {
        "text": "efficient",
        "startSec": 472.06,
        "endSec": 472.45
      },
      {
        "text": "manner.",
        "startSec": 472.5,
        "endSec": 472.89
      },
      {
        "text": "Next,",
        "startSec": 472.94,
        "endSec": 473.32
      },
      {
        "text": "we",
        "startSec": 473.38,
        "endSec": 473.76
      },
      {
        "text": "have",
        "startSec": 473.81,
        "endSec": 474.2
      },
      {
        "text": "Views,",
        "startSec": 474.25,
        "endSec": 474.64
      },
      {
        "text": "which",
        "startSec": 474.69,
        "endSec": 475.07
      },
      {
        "text": "are",
        "startSec": 475.13,
        "endSec": 475.51
      },
      {
        "text": "virtual",
        "startSec": 475.56,
        "endSec": 475.95
      }
    ]
  },
  {
    "id": "sql-seg-78",
    "title": "78. tables created by queries...",
    "startSec": 476,
    "endSec": 483,
    "text": "tables created by queries and can be used like  regular tables. They provide a way to simplify",
    "words": [
      {
        "text": "tables",
        "startSec": 476,
        "endSec": 476.36
      },
      {
        "text": "created",
        "startSec": 476.41,
        "endSec": 476.77
      },
      {
        "text": "by",
        "startSec": 476.82,
        "endSec": 477.19
      },
      {
        "text": "queries",
        "startSec": 477.24,
        "endSec": 477.6
      },
      {
        "text": "and",
        "startSec": 477.65,
        "endSec": 478.01
      },
      {
        "text": "can",
        "startSec": 478.06,
        "endSec": 478.42
      },
      {
        "text": "be",
        "startSec": 478.47,
        "endSec": 478.83
      },
      {
        "text": "used",
        "startSec": 478.88,
        "endSec": 479.24
      },
      {
        "text": "like",
        "startSec": 479.29,
        "endSec": 479.66
      },
      {
        "text": "regular",
        "startSec": 479.71,
        "endSec": 480.07
      },
      {
        "text": "tables.",
        "startSec": 480.12,
        "endSec": 480.48
      },
      {
        "text": "They",
        "startSec": 480.53,
        "endSec": 480.89
      },
      {
        "text": "provide",
        "startSec": 480.94,
        "endSec": 481.3
      },
      {
        "text": "a",
        "startSec": 481.35,
        "endSec": 481.71
      },
      {
        "text": "way",
        "startSec": 481.76,
        "endSec": 482.13
      },
      {
        "text": "to",
        "startSec": 482.18,
        "endSec": 482.54
      },
      {
        "text": "simplify",
        "startSec": 482.59,
        "endSec": 482.95
      }
    ]
  },
  {
    "id": "sql-seg-79",
    "title": "79. Transactions: complex queries and restrict...",
    "startSec": 483,
    "endSec": 489,
    "text": "complex queries and restrict access to sensitive  data. Here’s the sample syntax of a View,",
    "words": [
      {
        "text": "complex",
        "startSec": 483,
        "endSec": 483.35
      },
      {
        "text": "queries",
        "startSec": 483.4,
        "endSec": 483.75
      },
      {
        "text": "and",
        "startSec": 483.8,
        "endSec": 484.15
      },
      {
        "text": "restrict",
        "startSec": 484.2,
        "endSec": 484.55
      },
      {
        "text": "access",
        "startSec": 484.6,
        "endSec": 484.95
      },
      {
        "text": "to",
        "startSec": 485,
        "endSec": 485.35
      },
      {
        "text": "sensitive",
        "startSec": 485.4,
        "endSec": 485.75
      },
      {
        "text": "data.",
        "startSec": 485.8,
        "endSec": 486.15
      },
      {
        "text": "Here’s",
        "startSec": 486.2,
        "endSec": 486.55
      },
      {
        "text": "the",
        "startSec": 486.6,
        "endSec": 486.95
      },
      {
        "text": "sample",
        "startSec": 487,
        "endSec": 487.35
      },
      {
        "text": "syntax",
        "startSec": 487.4,
        "endSec": 487.75
      },
      {
        "text": "of",
        "startSec": 487.8,
        "endSec": 488.15
      },
      {
        "text": "a",
        "startSec": 488.2,
        "endSec": 488.55
      },
      {
        "text": "View,",
        "startSec": 488.6,
        "endSec": 488.95
      }
    ]
  },
  {
    "id": "sql-seg-80",
    "title": "80. Next, we have Transactions,...",
    "startSec": 489,
    "endSec": 494,
    "text": "Next, we have Transactions, that are nothing but  sequences of one or more SQL operations treated",
    "words": [
      {
        "text": "Next,",
        "startSec": 489,
        "endSec": 489.26
      },
      {
        "text": "we",
        "startSec": 489.31,
        "endSec": 489.57
      },
      {
        "text": "have",
        "startSec": 489.63,
        "endSec": 489.89
      },
      {
        "text": "Transactions,",
        "startSec": 489.94,
        "endSec": 490.2
      },
      {
        "text": "that",
        "startSec": 490.25,
        "endSec": 490.51
      },
      {
        "text": "are",
        "startSec": 490.56,
        "endSec": 490.82
      },
      {
        "text": "nothing",
        "startSec": 490.88,
        "endSec": 491.14
      },
      {
        "text": "but",
        "startSec": 491.19,
        "endSec": 491.45
      },
      {
        "text": "sequences",
        "startSec": 491.5,
        "endSec": 491.76
      },
      {
        "text": "of",
        "startSec": 491.81,
        "endSec": 492.07
      },
      {
        "text": "one",
        "startSec": 492.13,
        "endSec": 492.39
      },
      {
        "text": "or",
        "startSec": 492.44,
        "endSec": 492.7
      },
      {
        "text": "more",
        "startSec": 492.75,
        "endSec": 493.01
      },
      {
        "text": "SQL",
        "startSec": 493.06,
        "endSec": 493.32
      },
      {
        "text": "operations",
        "startSec": 493.38,
        "endSec": 493.64
      },
      {
        "text": "treated",
        "startSec": 493.69,
        "endSec": 493.95
      }
    ]
  },
  {
    "id": "sql-seg-81",
    "title": "81. as a single unit....",
    "startSec": 494,
    "endSec": 500,
    "text": "as a single unit. The purpose of a transaction  is to ensure that a series of related database",
    "words": [
      {
        "text": "as",
        "startSec": 494,
        "endSec": 494.28
      },
      {
        "text": "a",
        "startSec": 494.33,
        "endSec": 494.62
      },
      {
        "text": "single",
        "startSec": 494.67,
        "endSec": 494.95
      },
      {
        "text": "unit.",
        "startSec": 495,
        "endSec": 495.28
      },
      {
        "text": "The",
        "startSec": 495.33,
        "endSec": 495.62
      },
      {
        "text": "purpose",
        "startSec": 495.67,
        "endSec": 495.95
      },
      {
        "text": "of",
        "startSec": 496,
        "endSec": 496.28
      },
      {
        "text": "a",
        "startSec": 496.33,
        "endSec": 496.62
      },
      {
        "text": "transaction",
        "startSec": 496.67,
        "endSec": 496.95
      },
      {
        "text": "is",
        "startSec": 497,
        "endSec": 497.28
      },
      {
        "text": "to",
        "startSec": 497.33,
        "endSec": 497.62
      },
      {
        "text": "ensure",
        "startSec": 497.67,
        "endSec": 497.95
      },
      {
        "text": "that",
        "startSec": 498,
        "endSec": 498.28
      },
      {
        "text": "a",
        "startSec": 498.33,
        "endSec": 498.62
      },
      {
        "text": "series",
        "startSec": 498.67,
        "endSec": 498.95
      },
      {
        "text": "of",
        "startSec": 499,
        "endSec": 499.28
      },
      {
        "text": "related",
        "startSec": 499.33,
        "endSec": 499.62
      },
      {
        "text": "database",
        "startSec": 499.67,
        "endSec": 499.95
      }
    ]
  },
  {
    "id": "sql-seg-82",
    "title": "82. operations either all succeed...",
    "startSec": 500,
    "endSec": 507,
    "text": "operations either all succeed or all fail. This  is equally important as it helps in maintaining",
    "words": [
      {
        "text": "operations",
        "startSec": 500,
        "endSec": 500.39
      },
      {
        "text": "either",
        "startSec": 500.44,
        "endSec": 500.82
      },
      {
        "text": "all",
        "startSec": 500.88,
        "endSec": 501.26
      },
      {
        "text": "succeed",
        "startSec": 501.31,
        "endSec": 501.7
      },
      {
        "text": "or",
        "startSec": 501.75,
        "endSec": 502.14
      },
      {
        "text": "all",
        "startSec": 502.19,
        "endSec": 502.57
      },
      {
        "text": "fail.",
        "startSec": 502.63,
        "endSec": 503.01
      },
      {
        "text": "This",
        "startSec": 503.06,
        "endSec": 503.45
      },
      {
        "text": "is",
        "startSec": 503.5,
        "endSec": 503.89
      },
      {
        "text": "equally",
        "startSec": 503.94,
        "endSec": 504.32
      },
      {
        "text": "important",
        "startSec": 504.38,
        "endSec": 504.76
      },
      {
        "text": "as",
        "startSec": 504.81,
        "endSec": 505.2
      },
      {
        "text": "it",
        "startSec": 505.25,
        "endSec": 505.64
      },
      {
        "text": "helps",
        "startSec": 505.69,
        "endSec": 506.07
      },
      {
        "text": "in",
        "startSec": 506.13,
        "endSec": 506.51
      },
      {
        "text": "maintaining",
        "startSec": 506.56,
        "endSec": 506.95
      }
    ]
  },
  {
    "id": "sql-seg-83",
    "title": "83. data integrity and consistency...",
    "startSec": 507,
    "endSec": 512,
    "text": "data integrity and consistency in SQL. This  property of transactions is often referred",
    "words": [
      {
        "text": "data",
        "startSec": 507,
        "endSec": 507.33
      },
      {
        "text": "integrity",
        "startSec": 507.38,
        "endSec": 507.72
      },
      {
        "text": "and",
        "startSec": 507.77,
        "endSec": 508.1
      },
      {
        "text": "consistency",
        "startSec": 508.15,
        "endSec": 508.49
      },
      {
        "text": "in",
        "startSec": 508.54,
        "endSec": 508.87
      },
      {
        "text": "SQL.",
        "startSec": 508.92,
        "endSec": 509.26
      },
      {
        "text": "This",
        "startSec": 509.31,
        "endSec": 509.64
      },
      {
        "text": "property",
        "startSec": 509.69,
        "endSec": 510.03
      },
      {
        "text": "of",
        "startSec": 510.08,
        "endSec": 510.41
      },
      {
        "text": "transactions",
        "startSec": 510.46,
        "endSec": 510.8
      },
      {
        "text": "is",
        "startSec": 510.85,
        "endSec": 511.18
      },
      {
        "text": "often",
        "startSec": 511.23,
        "endSec": 511.57
      },
      {
        "text": "referred",
        "startSec": 511.62,
        "endSec": 511.95
      }
    ]
  },
  {
    "id": "sql-seg-84",
    "title": "84. to as the ACID...",
    "startSec": 512,
    "endSec": 519,
    "text": "to as the ACID properties, which stands for  Atomicity, Consistency, Isolation, Durability.",
    "words": [
      {
        "text": "to",
        "startSec": 512,
        "endSec": 512.53
      },
      {
        "text": "as",
        "startSec": 512.58,
        "endSec": 513.12
      },
      {
        "text": "the",
        "startSec": 513.17,
        "endSec": 513.7
      },
      {
        "text": "ACID",
        "startSec": 513.75,
        "endSec": 514.28
      },
      {
        "text": "properties,",
        "startSec": 514.33,
        "endSec": 514.87
      },
      {
        "text": "which",
        "startSec": 514.92,
        "endSec": 515.45
      },
      {
        "text": "stands",
        "startSec": 515.5,
        "endSec": 516.03
      },
      {
        "text": "for",
        "startSec": 516.08,
        "endSec": 516.62
      },
      {
        "text": "Atomicity,",
        "startSec": 516.67,
        "endSec": 517.2
      },
      {
        "text": "Consistency,",
        "startSec": 517.25,
        "endSec": 517.78
      },
      {
        "text": "Isolation,",
        "startSec": 517.83,
        "endSec": 518.37
      },
      {
        "text": "Durability.",
        "startSec": 518.42,
        "endSec": 518.95
      }
    ]
  },
  {
    "id": "sql-seg-85",
    "title": "85. Furthermore, transactions have a...",
    "startSec": 519,
    "endSec": 524,
    "text": "Furthermore, transactions have a significant  impact on the reliability and correctness",
    "words": [
      {
        "text": "Furthermore,",
        "startSec": 519,
        "endSec": 519.4
      },
      {
        "text": "transactions",
        "startSec": 519.45,
        "endSec": 519.86
      },
      {
        "text": "have",
        "startSec": 519.91,
        "endSec": 520.31
      },
      {
        "text": "a",
        "startSec": 520.36,
        "endSec": 520.77
      },
      {
        "text": "significant",
        "startSec": 520.82,
        "endSec": 521.22
      },
      {
        "text": "impact",
        "startSec": 521.27,
        "endSec": 521.68
      },
      {
        "text": "on",
        "startSec": 521.73,
        "endSec": 522.13
      },
      {
        "text": "the",
        "startSec": 522.18,
        "endSec": 522.59
      },
      {
        "text": "reliability",
        "startSec": 522.64,
        "endSec": 523.04
      },
      {
        "text": "and",
        "startSec": 523.09,
        "endSec": 523.5
      },
      {
        "text": "correctness",
        "startSec": 523.55,
        "endSec": 523.95
      }
    ]
  },
  {
    "id": "sql-seg-86",
    "title": "86. of database operations as...",
    "startSec": 524,
    "endSec": 531,
    "text": "of database operations as well. Here’s a  sample syntax of a transaction in SQL, Next,",
    "words": [
      {
        "text": "of",
        "startSec": 524,
        "endSec": 524.42
      },
      {
        "text": "database",
        "startSec": 524.47,
        "endSec": 524.88
      },
      {
        "text": "operations",
        "startSec": 524.93,
        "endSec": 525.35
      },
      {
        "text": "as",
        "startSec": 525.4,
        "endSec": 525.82
      },
      {
        "text": "well.",
        "startSec": 525.87,
        "endSec": 526.28
      },
      {
        "text": "Here’s",
        "startSec": 526.33,
        "endSec": 526.75
      },
      {
        "text": "a",
        "startSec": 526.8,
        "endSec": 527.22
      },
      {
        "text": "sample",
        "startSec": 527.27,
        "endSec": 527.68
      },
      {
        "text": "syntax",
        "startSec": 527.73,
        "endSec": 528.15
      },
      {
        "text": "of",
        "startSec": 528.2,
        "endSec": 528.62
      },
      {
        "text": "a",
        "startSec": 528.67,
        "endSec": 529.08
      },
      {
        "text": "transaction",
        "startSec": 529.13,
        "endSec": 529.55
      },
      {
        "text": "in",
        "startSec": 529.6,
        "endSec": 530.02
      },
      {
        "text": "SQL,",
        "startSec": 530.07,
        "endSec": 530.48
      },
      {
        "text": "Next,",
        "startSec": 530.53,
        "endSec": 530.95
      }
    ]
  },
  {
    "id": "sql-seg-87",
    "title": "87. we have the concept...",
    "startSec": 531,
    "endSec": 537,
    "text": "we have the concept of Normalization, which is  fundamentally the process of organizing data in a",
    "words": [
      {
        "text": "we",
        "startSec": 531,
        "endSec": 531.33
      },
      {
        "text": "have",
        "startSec": 531.38,
        "endSec": 531.7
      },
      {
        "text": "the",
        "startSec": 531.75,
        "endSec": 532.08
      },
      {
        "text": "concept",
        "startSec": 532.13,
        "endSec": 532.45
      },
      {
        "text": "of",
        "startSec": 532.5,
        "endSec": 532.83
      },
      {
        "text": "Normalization,",
        "startSec": 532.88,
        "endSec": 533.2
      },
      {
        "text": "which",
        "startSec": 533.25,
        "endSec": 533.58
      },
      {
        "text": "is",
        "startSec": 533.63,
        "endSec": 533.95
      },
      {
        "text": "fundamentally",
        "startSec": 534,
        "endSec": 534.33
      },
      {
        "text": "the",
        "startSec": 534.38,
        "endSec": 534.7
      },
      {
        "text": "process",
        "startSec": 534.75,
        "endSec": 535.08
      },
      {
        "text": "of",
        "startSec": 535.13,
        "endSec": 535.45
      },
      {
        "text": "organizing",
        "startSec": 535.5,
        "endSec": 535.83
      },
      {
        "text": "data",
        "startSec": 535.88,
        "endSec": 536.2
      },
      {
        "text": "in",
        "startSec": 536.25,
        "endSec": 536.58
      },
      {
        "text": "a",
        "startSec": 536.63,
        "endSec": 536.95
      }
    ]
  },
  {
    "id": "sql-seg-88",
    "title": "88. database to eliminate redundancy...",
    "startSec": 537,
    "endSec": 543,
    "text": "database to eliminate redundancy and improve data  integrity. It involves dividing a database into",
    "words": [
      {
        "text": "database",
        "startSec": 537,
        "endSec": 537.38
      },
      {
        "text": "to",
        "startSec": 537.43,
        "endSec": 537.81
      },
      {
        "text": "eliminate",
        "startSec": 537.86,
        "endSec": 538.24
      },
      {
        "text": "redundancy",
        "startSec": 538.29,
        "endSec": 538.66
      },
      {
        "text": "and",
        "startSec": 538.71,
        "endSec": 539.09
      },
      {
        "text": "improve",
        "startSec": 539.14,
        "endSec": 539.52
      },
      {
        "text": "data",
        "startSec": 539.57,
        "endSec": 539.95
      },
      {
        "text": "integrity.",
        "startSec": 540,
        "endSec": 540.38
      },
      {
        "text": "It",
        "startSec": 540.43,
        "endSec": 540.81
      },
      {
        "text": "involves",
        "startSec": 540.86,
        "endSec": 541.24
      },
      {
        "text": "dividing",
        "startSec": 541.29,
        "endSec": 541.66
      },
      {
        "text": "a",
        "startSec": 541.71,
        "endSec": 542.09
      },
      {
        "text": "database",
        "startSec": 542.14,
        "endSec": 542.52
      },
      {
        "text": "into",
        "startSec": 542.57,
        "endSec": 542.95
      }
    ]
  },
  {
    "id": "sql-seg-89",
    "title": "89. Triggers: tables and defining relationships...",
    "startSec": 543,
    "endSec": 549,
    "text": "tables and defining relationships between them. We  have another thing in SQL called Stored Procedures",
    "words": [
      {
        "text": "tables",
        "startSec": 543,
        "endSec": 543.35
      },
      {
        "text": "and",
        "startSec": 543.4,
        "endSec": 543.75
      },
      {
        "text": "defining",
        "startSec": 543.8,
        "endSec": 544.15
      },
      {
        "text": "relationships",
        "startSec": 544.2,
        "endSec": 544.55
      },
      {
        "text": "between",
        "startSec": 544.6,
        "endSec": 544.95
      },
      {
        "text": "them.",
        "startSec": 545,
        "endSec": 545.35
      },
      {
        "text": "We",
        "startSec": 545.4,
        "endSec": 545.75
      },
      {
        "text": "have",
        "startSec": 545.8,
        "endSec": 546.15
      },
      {
        "text": "another",
        "startSec": 546.2,
        "endSec": 546.55
      },
      {
        "text": "thing",
        "startSec": 546.6,
        "endSec": 546.95
      },
      {
        "text": "in",
        "startSec": 547,
        "endSec": 547.35
      },
      {
        "text": "SQL",
        "startSec": 547.4,
        "endSec": 547.75
      },
      {
        "text": "called",
        "startSec": 547.8,
        "endSec": 548.15
      },
      {
        "text": "Stored",
        "startSec": 548.2,
        "endSec": 548.55
      },
      {
        "text": "Procedures",
        "startSec": 548.6,
        "endSec": 548.95
      }
    ]
  },
  {
    "id": "sql-seg-90",
    "title": "90. which are primarily precompiled...",
    "startSec": 549,
    "endSec": 556,
    "text": "which are primarily precompiled SQL code that can  be stored and executed on the database server.",
    "words": [
      {
        "text": "which",
        "startSec": 549,
        "endSec": 549.39
      },
      {
        "text": "are",
        "startSec": 549.44,
        "endSec": 549.83
      },
      {
        "text": "primarily",
        "startSec": 549.88,
        "endSec": 550.26
      },
      {
        "text": "precompiled",
        "startSec": 550.31,
        "endSec": 550.7
      },
      {
        "text": "SQL",
        "startSec": 550.75,
        "endSec": 551.14
      },
      {
        "text": "code",
        "startSec": 551.19,
        "endSec": 551.58
      },
      {
        "text": "that",
        "startSec": 551.63,
        "endSec": 552.01
      },
      {
        "text": "can",
        "startSec": 552.06,
        "endSec": 552.45
      },
      {
        "text": "be",
        "startSec": 552.5,
        "endSec": 552.89
      },
      {
        "text": "stored",
        "startSec": 552.94,
        "endSec": 553.33
      },
      {
        "text": "and",
        "startSec": 553.38,
        "endSec": 553.76
      },
      {
        "text": "executed",
        "startSec": 553.81,
        "endSec": 554.2
      },
      {
        "text": "on",
        "startSec": 554.25,
        "endSec": 554.64
      },
      {
        "text": "the",
        "startSec": 554.69,
        "endSec": 555.08
      },
      {
        "text": "database",
        "startSec": 555.13,
        "endSec": 555.51
      },
      {
        "text": "server.",
        "startSec": 555.56,
        "endSec": 555.95
      }
    ]
  },
  {
    "id": "sql-seg-91",
    "title": "91. They also help in...",
    "startSec": 556,
    "endSec": 562,
    "text": "They also help in improving performance and  security. Lastly, we have the concept of Triggers,",
    "words": [
      {
        "text": "They",
        "startSec": 556,
        "endSec": 556.35
      },
      {
        "text": "also",
        "startSec": 556.4,
        "endSec": 556.75
      },
      {
        "text": "help",
        "startSec": 556.8,
        "endSec": 557.15
      },
      {
        "text": "in",
        "startSec": 557.2,
        "endSec": 557.55
      },
      {
        "text": "improving",
        "startSec": 557.6,
        "endSec": 557.95
      },
      {
        "text": "performance",
        "startSec": 558,
        "endSec": 558.35
      },
      {
        "text": "and",
        "startSec": 558.4,
        "endSec": 558.75
      },
      {
        "text": "security.",
        "startSec": 558.8,
        "endSec": 559.15
      },
      {
        "text": "Lastly,",
        "startSec": 559.2,
        "endSec": 559.55
      },
      {
        "text": "we",
        "startSec": 559.6,
        "endSec": 559.95
      },
      {
        "text": "have",
        "startSec": 560,
        "endSec": 560.35
      },
      {
        "text": "the",
        "startSec": 560.4,
        "endSec": 560.75
      },
      {
        "text": "concept",
        "startSec": 560.8,
        "endSec": 561.15
      },
      {
        "text": "of",
        "startSec": 561.2,
        "endSec": 561.55
      },
      {
        "text": "Triggers,",
        "startSec": 561.6,
        "endSec": 561.95
      }
    ]
  },
  {
    "id": "sql-seg-92",
    "title": "92. which are database objects...",
    "startSec": 562,
    "endSec": 567,
    "text": "which are database objects that automatically  execute in response to specific events,",
    "words": [
      {
        "text": "which",
        "startSec": 562,
        "endSec": 562.37
      },
      {
        "text": "are",
        "startSec": 562.42,
        "endSec": 562.78
      },
      {
        "text": "database",
        "startSec": 562.83,
        "endSec": 563.2
      },
      {
        "text": "objects",
        "startSec": 563.25,
        "endSec": 563.62
      },
      {
        "text": "that",
        "startSec": 563.67,
        "endSec": 564.03
      },
      {
        "text": "automatically",
        "startSec": 564.08,
        "endSec": 564.45
      },
      {
        "text": "execute",
        "startSec": 564.5,
        "endSec": 564.87
      },
      {
        "text": "in",
        "startSec": 564.92,
        "endSec": 565.28
      },
      {
        "text": "response",
        "startSec": 565.33,
        "endSec": 565.7
      },
      {
        "text": "to",
        "startSec": 565.75,
        "endSec": 566.12
      },
      {
        "text": "specific",
        "startSec": 566.17,
        "endSec": 566.53
      },
      {
        "text": "events,",
        "startSec": 566.58,
        "endSec": 566.95
      }
    ]
  },
  {
    "id": "sql-seg-93",
    "title": "93. such as data modification,...",
    "startSec": 567,
    "endSec": 574,
    "text": "such as data modification, thereby, ensuring data  consistency and integrity. Here’s the syntax for",
    "words": [
      {
        "text": "such",
        "startSec": 567,
        "endSec": 567.45
      },
      {
        "text": "as",
        "startSec": 567.5,
        "endSec": 567.95
      },
      {
        "text": "data",
        "startSec": 568,
        "endSec": 568.45
      },
      {
        "text": "modification,",
        "startSec": 568.5,
        "endSec": 568.95
      },
      {
        "text": "thereby,",
        "startSec": 569,
        "endSec": 569.45
      },
      {
        "text": "ensuring",
        "startSec": 569.5,
        "endSec": 569.95
      },
      {
        "text": "data",
        "startSec": 570,
        "endSec": 570.45
      },
      {
        "text": "consistency",
        "startSec": 570.5,
        "endSec": 570.95
      },
      {
        "text": "and",
        "startSec": 571,
        "endSec": 571.45
      },
      {
        "text": "integrity.",
        "startSec": 571.5,
        "endSec": 571.95
      },
      {
        "text": "Here’s",
        "startSec": 572,
        "endSec": 572.45
      },
      {
        "text": "the",
        "startSec": 572.5,
        "endSec": 572.95
      },
      {
        "text": "syntax",
        "startSec": 573,
        "endSec": 573.45
      },
      {
        "text": "for",
        "startSec": 573.5,
        "endSec": 573.95
      }
    ]
  },
  {
    "id": "sql-seg-94",
    "title": "94. the same, CREATE [OR...",
    "startSec": 574,
    "endSec": 581,
    "text": "the same, CREATE [OR REPLACE] TRIGGER: This is  the beginning of the trigger creation statement.",
    "words": [
      {
        "text": "the",
        "startSec": 574,
        "endSec": 574.42
      },
      {
        "text": "same,",
        "startSec": 574.47,
        "endSec": 574.88
      },
      {
        "text": "CREATE",
        "startSec": 574.93,
        "endSec": 575.35
      },
      {
        "text": "[OR",
        "startSec": 575.4,
        "endSec": 575.82
      },
      {
        "text": "REPLACE]",
        "startSec": 575.87,
        "endSec": 576.28
      },
      {
        "text": "TRIGGER:",
        "startSec": 576.33,
        "endSec": 576.75
      },
      {
        "text": "This",
        "startSec": 576.8,
        "endSec": 577.22
      },
      {
        "text": "is",
        "startSec": 577.27,
        "endSec": 577.68
      },
      {
        "text": "the",
        "startSec": 577.73,
        "endSec": 578.15
      },
      {
        "text": "beginning",
        "startSec": 578.2,
        "endSec": 578.62
      },
      {
        "text": "of",
        "startSec": 578.67,
        "endSec": 579.08
      },
      {
        "text": "the",
        "startSec": 579.13,
        "endSec": 579.55
      },
      {
        "text": "trigger",
        "startSec": 579.6,
        "endSec": 580.02
      },
      {
        "text": "creation",
        "startSec": 580.07,
        "endSec": 580.48
      },
      {
        "text": "statement.",
        "startSec": 580.53,
        "endSec": 580.95
      }
    ]
  },
  {
    "id": "sql-seg-95",
    "title": "95. The OR REPLACE keyword...",
    "startSec": 581,
    "endSec": 587,
    "text": "The OR REPLACE keyword is optional and allows  us to modify an existing trigger with the same",
    "words": [
      {
        "text": "The",
        "startSec": 581,
        "endSec": 581.3
      },
      {
        "text": "OR",
        "startSec": 581.35,
        "endSec": 581.66
      },
      {
        "text": "REPLACE",
        "startSec": 581.71,
        "endSec": 582.01
      },
      {
        "text": "keyword",
        "startSec": 582.06,
        "endSec": 582.36
      },
      {
        "text": "is",
        "startSec": 582.41,
        "endSec": 582.71
      },
      {
        "text": "optional",
        "startSec": 582.76,
        "endSec": 583.07
      },
      {
        "text": "and",
        "startSec": 583.12,
        "endSec": 583.42
      },
      {
        "text": "allows",
        "startSec": 583.47,
        "endSec": 583.77
      },
      {
        "text": "us",
        "startSec": 583.82,
        "endSec": 584.13
      },
      {
        "text": "to",
        "startSec": 584.18,
        "endSec": 584.48
      },
      {
        "text": "modify",
        "startSec": 584.53,
        "endSec": 584.83
      },
      {
        "text": "an",
        "startSec": 584.88,
        "endSec": 585.19
      },
      {
        "text": "existing",
        "startSec": 585.24,
        "endSec": 585.54
      },
      {
        "text": "trigger",
        "startSec": 585.59,
        "endSec": 585.89
      },
      {
        "text": "with",
        "startSec": 585.94,
        "endSec": 586.24
      },
      {
        "text": "the",
        "startSec": 586.29,
        "endSec": 586.6
      },
      {
        "text": "same",
        "startSec": 586.65,
        "endSec": 586.95
      }
    ]
  },
  {
    "id": "sql-seg-96",
    "title": "96. name. trigger_name: is the...",
    "startSec": 587,
    "endSec": 593,
    "text": "name. trigger_name: is the name we give to the  trigger. {BEFORE | AFTER | INSTEAD OF}: specifies",
    "words": [
      {
        "text": "name.",
        "startSec": 587,
        "endSec": 587.3
      },
      {
        "text": "trigger_name:",
        "startSec": 587.35,
        "endSec": 587.66
      },
      {
        "text": "is",
        "startSec": 587.71,
        "endSec": 588.01
      },
      {
        "text": "the",
        "startSec": 588.06,
        "endSec": 588.36
      },
      {
        "text": "name",
        "startSec": 588.41,
        "endSec": 588.71
      },
      {
        "text": "we",
        "startSec": 588.76,
        "endSec": 589.07
      },
      {
        "text": "give",
        "startSec": 589.12,
        "endSec": 589.42
      },
      {
        "text": "to",
        "startSec": 589.47,
        "endSec": 589.77
      },
      {
        "text": "the",
        "startSec": 589.82,
        "endSec": 590.13
      },
      {
        "text": "trigger.",
        "startSec": 590.18,
        "endSec": 590.48
      },
      {
        "text": "{BEFORE",
        "startSec": 590.53,
        "endSec": 590.83
      },
      {
        "text": "|",
        "startSec": 590.88,
        "endSec": 591.19
      },
      {
        "text": "AFTER",
        "startSec": 591.24,
        "endSec": 591.54
      },
      {
        "text": "|",
        "startSec": 591.59,
        "endSec": 591.89
      },
      {
        "text": "INSTEAD",
        "startSec": 591.94,
        "endSec": 592.24
      },
      {
        "text": "OF}:",
        "startSec": 592.29,
        "endSec": 592.6
      },
      {
        "text": "specifies",
        "startSec": 592.65,
        "endSec": 592.95
      }
    ]
  },
  {
    "id": "sql-seg-97",
    "title": "97. when the trigger will...",
    "startSec": 593,
    "endSec": 598,
    "text": "when the trigger will be activated concerning the  triggering event. BEFORE triggers are executed",
    "words": [
      {
        "text": "when",
        "startSec": 593,
        "endSec": 593.31
      },
      {
        "text": "the",
        "startSec": 593.36,
        "endSec": 593.66
      },
      {
        "text": "trigger",
        "startSec": 593.71,
        "endSec": 594.02
      },
      {
        "text": "will",
        "startSec": 594.07,
        "endSec": 594.38
      },
      {
        "text": "be",
        "startSec": 594.43,
        "endSec": 594.74
      },
      {
        "text": "activated",
        "startSec": 594.79,
        "endSec": 595.09
      },
      {
        "text": "concerning",
        "startSec": 595.14,
        "endSec": 595.45
      },
      {
        "text": "the",
        "startSec": 595.5,
        "endSec": 595.81
      },
      {
        "text": "triggering",
        "startSec": 595.86,
        "endSec": 596.16
      },
      {
        "text": "event.",
        "startSec": 596.21,
        "endSec": 596.52
      },
      {
        "text": "BEFORE",
        "startSec": 596.57,
        "endSec": 596.88
      },
      {
        "text": "triggers",
        "startSec": 596.93,
        "endSec": 597.24
      },
      {
        "text": "are",
        "startSec": 597.29,
        "endSec": 597.59
      },
      {
        "text": "executed",
        "startSec": 597.64,
        "endSec": 597.95
      }
    ]
  },
  {
    "id": "sql-seg-98",
    "title": "98. before the triggering event,...",
    "startSec": 598,
    "endSec": 603,
    "text": "before the triggering event, AFTER triggers are  executed after the triggering event, and INSTEAD",
    "words": [
      {
        "text": "before",
        "startSec": 598,
        "endSec": 598.31
      },
      {
        "text": "the",
        "startSec": 598.36,
        "endSec": 598.66
      },
      {
        "text": "triggering",
        "startSec": 598.71,
        "endSec": 599.02
      },
      {
        "text": "event,",
        "startSec": 599.07,
        "endSec": 599.38
      },
      {
        "text": "AFTER",
        "startSec": 599.43,
        "endSec": 599.74
      },
      {
        "text": "triggers",
        "startSec": 599.79,
        "endSec": 600.09
      },
      {
        "text": "are",
        "startSec": 600.14,
        "endSec": 600.45
      },
      {
        "text": "executed",
        "startSec": 600.5,
        "endSec": 600.81
      },
      {
        "text": "after",
        "startSec": 600.86,
        "endSec": 601.16
      },
      {
        "text": "the",
        "startSec": 601.21,
        "endSec": 601.52
      },
      {
        "text": "triggering",
        "startSec": 601.57,
        "endSec": 601.88
      },
      {
        "text": "event,",
        "startSec": 601.93,
        "endSec": 602.24
      },
      {
        "text": "and",
        "startSec": 602.29,
        "endSec": 602.59
      },
      {
        "text": "INSTEAD",
        "startSec": 602.64,
        "endSec": 602.95
      }
    ]
  },
  {
    "id": "sql-seg-99",
    "title": "99. OF triggers are executed...",
    "startSec": 603,
    "endSec": 612,
    "text": "OF triggers are executed instead of the triggering  event (used in certain cases like with views).",
    "words": [
      {
        "text": "OF",
        "startSec": 603,
        "endSec": 603.51
      },
      {
        "text": "triggers",
        "startSec": 603.56,
        "endSec": 604.08
      },
      {
        "text": "are",
        "startSec": 604.13,
        "endSec": 604.64
      },
      {
        "text": "executed",
        "startSec": 604.69,
        "endSec": 605.2
      },
      {
        "text": "instead",
        "startSec": 605.25,
        "endSec": 605.76
      },
      {
        "text": "of",
        "startSec": 605.81,
        "endSec": 606.33
      },
      {
        "text": "the",
        "startSec": 606.38,
        "endSec": 606.89
      },
      {
        "text": "triggering",
        "startSec": 606.94,
        "endSec": 607.45
      },
      {
        "text": "event",
        "startSec": 607.5,
        "endSec": 608.01
      },
      {
        "text": "(used",
        "startSec": 608.06,
        "endSec": 608.58
      },
      {
        "text": "in",
        "startSec": 608.63,
        "endSec": 609.14
      },
      {
        "text": "certain",
        "startSec": 609.19,
        "endSec": 609.7
      },
      {
        "text": "cases",
        "startSec": 609.75,
        "endSec": 610.26
      },
      {
        "text": "like",
        "startSec": 610.31,
        "endSec": 610.83
      },
      {
        "text": "with",
        "startSec": 610.88,
        "endSec": 611.39
      },
      {
        "text": "views).",
        "startSec": 611.44,
        "endSec": 611.95
      }
    ]
  },
  {
    "id": "sql-seg-100",
    "title": "100. {INSERT | UPDATE |...",
    "startSec": 612,
    "endSec": 618,
    "text": "{INSERT | UPDATE | DELETE}: This specifies the  type of action that will activate the trigger.",
    "words": [
      {
        "text": "{INSERT",
        "startSec": 612,
        "endSec": 612.33
      },
      {
        "text": "|",
        "startSec": 612.38,
        "endSec": 612.7
      },
      {
        "text": "UPDATE",
        "startSec": 612.75,
        "endSec": 613.08
      },
      {
        "text": "|",
        "startSec": 613.13,
        "endSec": 613.45
      },
      {
        "text": "DELETE}:",
        "startSec": 613.5,
        "endSec": 613.83
      },
      {
        "text": "This",
        "startSec": 613.88,
        "endSec": 614.2
      },
      {
        "text": "specifies",
        "startSec": 614.25,
        "endSec": 614.58
      },
      {
        "text": "the",
        "startSec": 614.63,
        "endSec": 614.95
      },
      {
        "text": "type",
        "startSec": 615,
        "endSec": 615.33
      },
      {
        "text": "of",
        "startSec": 615.38,
        "endSec": 615.7
      },
      {
        "text": "action",
        "startSec": 615.75,
        "endSec": 616.08
      },
      {
        "text": "that",
        "startSec": 616.13,
        "endSec": 616.45
      },
      {
        "text": "will",
        "startSec": 616.5,
        "endSec": 616.83
      },
      {
        "text": "activate",
        "startSec": 616.88,
        "endSec": 617.2
      },
      {
        "text": "the",
        "startSec": 617.25,
        "endSec": 617.58
      },
      {
        "text": "trigger.",
        "startSec": 617.63,
        "endSec": 617.95
      }
    ]
  },
  {
    "id": "sql-seg-101",
    "title": "101. [FOR EACH ROW]: is...",
    "startSec": 618,
    "endSec": 624,
    "text": "[FOR EACH ROW]: is the clause used when you want  the trigger to be fired for each affected row",
    "words": [
      {
        "text": "[FOR",
        "startSec": 618,
        "endSec": 618.27
      },
      {
        "text": "EACH",
        "startSec": 618.32,
        "endSec": 618.58
      },
      {
        "text": "ROW]:",
        "startSec": 618.63,
        "endSec": 618.9
      },
      {
        "text": "is",
        "startSec": 618.95,
        "endSec": 619.21
      },
      {
        "text": "the",
        "startSec": 619.26,
        "endSec": 619.53
      },
      {
        "text": "clause",
        "startSec": 619.58,
        "endSec": 619.84
      },
      {
        "text": "used",
        "startSec": 619.89,
        "endSec": 620.16
      },
      {
        "text": "when",
        "startSec": 620.21,
        "endSec": 620.48
      },
      {
        "text": "you",
        "startSec": 620.53,
        "endSec": 620.79
      },
      {
        "text": "want",
        "startSec": 620.84,
        "endSec": 621.11
      },
      {
        "text": "the",
        "startSec": 621.16,
        "endSec": 621.42
      },
      {
        "text": "trigger",
        "startSec": 621.47,
        "endSec": 621.74
      },
      {
        "text": "to",
        "startSec": 621.79,
        "endSec": 622.06
      },
      {
        "text": "be",
        "startSec": 622.11,
        "endSec": 622.37
      },
      {
        "text": "fired",
        "startSec": 622.42,
        "endSec": 622.69
      },
      {
        "text": "for",
        "startSec": 622.74,
        "endSec": 623
      },
      {
        "text": "each",
        "startSec": 623.05,
        "endSec": 623.32
      },
      {
        "text": "affected",
        "startSec": 623.37,
        "endSec": 623.63
      },
      {
        "text": "row",
        "startSec": 623.68,
        "endSec": 623.95
      }
    ]
  },
  {
    "id": "sql-seg-102",
    "title": "102. in the table. It...",
    "startSec": 624,
    "endSec": 632,
    "text": "in the table. It is usually used in row-level  triggers and, BEGIN ... END; is the body of the",
    "words": [
      {
        "text": "in",
        "startSec": 624,
        "endSec": 624.37
      },
      {
        "text": "the",
        "startSec": 624.42,
        "endSec": 624.79
      },
      {
        "text": "table.",
        "startSec": 624.84,
        "endSec": 625.21
      },
      {
        "text": "It",
        "startSec": 625.26,
        "endSec": 625.63
      },
      {
        "text": "is",
        "startSec": 625.68,
        "endSec": 626.06
      },
      {
        "text": "usually",
        "startSec": 626.11,
        "endSec": 626.48
      },
      {
        "text": "used",
        "startSec": 626.53,
        "endSec": 626.9
      },
      {
        "text": "in",
        "startSec": 626.95,
        "endSec": 627.32
      },
      {
        "text": "row-level",
        "startSec": 627.37,
        "endSec": 627.74
      },
      {
        "text": "triggers",
        "startSec": 627.79,
        "endSec": 628.16
      },
      {
        "text": "and,",
        "startSec": 628.21,
        "endSec": 628.58
      },
      {
        "text": "BEGIN",
        "startSec": 628.63,
        "endSec": 629
      },
      {
        "text": "...",
        "startSec": 629.05,
        "endSec": 629.42
      },
      {
        "text": "END;",
        "startSec": 629.47,
        "endSec": 629.84
      },
      {
        "text": "is",
        "startSec": 629.89,
        "endSec": 630.27
      },
      {
        "text": "the",
        "startSec": 630.32,
        "endSec": 630.69
      },
      {
        "text": "body",
        "startSec": 630.74,
        "endSec": 631.11
      },
      {
        "text": "of",
        "startSec": 631.16,
        "endSec": 631.53
      },
      {
        "text": "the",
        "startSec": 631.58,
        "endSec": 631.95
      }
    ]
  },
  {
    "id": "sql-seg-103",
    "title": "103. trigger where you write...",
    "startSec": 632,
    "endSec": 638,
    "text": "trigger where you write the SQL statements that  should be executed when the trigger is activated.",
    "words": [
      {
        "text": "trigger",
        "startSec": 632,
        "endSec": 632.33
      },
      {
        "text": "where",
        "startSec": 632.38,
        "endSec": 632.7
      },
      {
        "text": "you",
        "startSec": 632.75,
        "endSec": 633.08
      },
      {
        "text": "write",
        "startSec": 633.13,
        "endSec": 633.45
      },
      {
        "text": "the",
        "startSec": 633.5,
        "endSec": 633.83
      },
      {
        "text": "SQL",
        "startSec": 633.88,
        "endSec": 634.2
      },
      {
        "text": "statements",
        "startSec": 634.25,
        "endSec": 634.58
      },
      {
        "text": "that",
        "startSec": 634.63,
        "endSec": 634.95
      },
      {
        "text": "should",
        "startSec": 635,
        "endSec": 635.33
      },
      {
        "text": "be",
        "startSec": 635.38,
        "endSec": 635.7
      },
      {
        "text": "executed",
        "startSec": 635.75,
        "endSec": 636.08
      },
      {
        "text": "when",
        "startSec": 636.13,
        "endSec": 636.45
      },
      {
        "text": "the",
        "startSec": 636.5,
        "endSec": 636.83
      },
      {
        "text": "trigger",
        "startSec": 636.88,
        "endSec": 637.2
      },
      {
        "text": "is",
        "startSec": 637.25,
        "endSec": 637.58
      },
      {
        "text": "activated.",
        "startSec": 637.63,
        "endSec": 637.95
      }
    ]
  },
  {
    "id": "sql-seg-104",
    "title": "104. With that, I hope...",
    "startSec": 638,
    "endSec": 643,
    "text": "With that, I hope this video was helpful  and served value. If you like my content,",
    "words": [
      {
        "text": "With",
        "startSec": 638,
        "endSec": 638.26
      },
      {
        "text": "that,",
        "startSec": 638.31,
        "endSec": 638.58
      },
      {
        "text": "I",
        "startSec": 638.63,
        "endSec": 638.89
      },
      {
        "text": "hope",
        "startSec": 638.94,
        "endSec": 639.2
      },
      {
        "text": "this",
        "startSec": 639.25,
        "endSec": 639.51
      },
      {
        "text": "video",
        "startSec": 639.56,
        "endSec": 639.83
      },
      {
        "text": "was",
        "startSec": 639.88,
        "endSec": 640.14
      },
      {
        "text": "helpful",
        "startSec": 640.19,
        "endSec": 640.45
      },
      {
        "text": "and",
        "startSec": 640.5,
        "endSec": 640.76
      },
      {
        "text": "served",
        "startSec": 640.81,
        "endSec": 641.08
      },
      {
        "text": "value.",
        "startSec": 641.13,
        "endSec": 641.39
      },
      {
        "text": "If",
        "startSec": 641.44,
        "endSec": 641.7
      },
      {
        "text": "you",
        "startSec": 641.75,
        "endSec": 642.01
      },
      {
        "text": "like",
        "startSec": 642.06,
        "endSec": 642.33
      },
      {
        "text": "my",
        "startSec": 642.38,
        "endSec": 642.64
      },
      {
        "text": "content,",
        "startSec": 642.69,
        "endSec": 642.95
      }
    ]
  },
  {
    "id": "sql-seg-105",
    "title": "105. feel free to smash...",
    "startSec": 643,
    "endSec": 647,
    "text": "feel free to smash that like button and if  you haven't already subscribed to my channel,",
    "words": [
      {
        "text": "feel",
        "startSec": 643,
        "endSec": 643.2
      },
      {
        "text": "free",
        "startSec": 643.25,
        "endSec": 643.45
      },
      {
        "text": "to",
        "startSec": 643.5,
        "endSec": 643.7
      },
      {
        "text": "smash",
        "startSec": 643.75,
        "endSec": 643.95
      },
      {
        "text": "that",
        "startSec": 644,
        "endSec": 644.2
      },
      {
        "text": "like",
        "startSec": 644.25,
        "endSec": 644.45
      },
      {
        "text": "button",
        "startSec": 644.5,
        "endSec": 644.7
      },
      {
        "text": "and",
        "startSec": 644.75,
        "endSec": 644.95
      },
      {
        "text": "if",
        "startSec": 645,
        "endSec": 645.2
      },
      {
        "text": "you",
        "startSec": 645.25,
        "endSec": 645.45
      },
      {
        "text": "haven't",
        "startSec": 645.5,
        "endSec": 645.7
      },
      {
        "text": "already",
        "startSec": 645.75,
        "endSec": 645.95
      },
      {
        "text": "subscribed",
        "startSec": 646,
        "endSec": 646.2
      },
      {
        "text": "to",
        "startSec": 646.25,
        "endSec": 646.45
      },
      {
        "text": "my",
        "startSec": 646.5,
        "endSec": 646.7
      },
      {
        "text": "channel,",
        "startSec": 646.75,
        "endSec": 646.95
      }
    ]
  },
  {
    "id": "sql-seg-106",
    "title": "106. please do, as it...",
    "startSec": 647,
    "endSec": 662,
    "text": "please do, as it keeps me motivated and  helps me create more quality content for you",
    "words": [
      {
        "text": "please",
        "startSec": 647,
        "endSec": 647.89
      },
      {
        "text": "do,",
        "startSec": 647.94,
        "endSec": 648.83
      },
      {
        "text": "as",
        "startSec": 648.88,
        "endSec": 649.76
      },
      {
        "text": "it",
        "startSec": 649.81,
        "endSec": 650.7
      },
      {
        "text": "keeps",
        "startSec": 650.75,
        "endSec": 651.64
      },
      {
        "text": "me",
        "startSec": 651.69,
        "endSec": 652.58
      },
      {
        "text": "motivated",
        "startSec": 652.63,
        "endSec": 653.51
      },
      {
        "text": "and",
        "startSec": 653.56,
        "endSec": 654.45
      },
      {
        "text": "helps",
        "startSec": 654.5,
        "endSec": 655.39
      },
      {
        "text": "me",
        "startSec": 655.44,
        "endSec": 656.33
      },
      {
        "text": "create",
        "startSec": 656.38,
        "endSec": 657.26
      },
      {
        "text": "more",
        "startSec": 657.31,
        "endSec": 658.2
      },
      {
        "text": "quality",
        "startSec": 658.25,
        "endSec": 659.14
      },
      {
        "text": "content",
        "startSec": 659.19,
        "endSec": 660.08
      },
      {
        "text": "for",
        "startSec": 660.13,
        "endSec": 661.01
      },
      {
        "text": "you",
        "startSec": 661.06,
        "endSec": 661.95
      }
    ]
  }
];

// Pre-defined detailed transcript for Thermodynamics & Heat Transfer
const THERMODYNAMICS_TRANSCRIPT: TranscriptSegment[] = [
  {
    id: "seg-1",
    title: "1. Introduction to Thermodynamics",
    startSec: 0,
    endSec: 12,
    text: "Welcome to this lecture on Thermodynamics and Heat Transfer. In mechanical engineering, energy transformation is fundamental to all modern power and propulsion systems.",
    words: [
      { text: "Welcome", startSec: 0.0, endSec: 0.6 },
      { text: "to", startSec: 0.7, endSec: 0.9 },
      { text: "this", startSec: 1.0, endSec: 1.3 },
      { text: "lecture", startSec: 1.4, endSec: 1.9 },
      { text: "on", startSec: 2.0, endSec: 2.2 },
      { text: "Thermodynamics", startSec: 2.3, endSec: 3.2 },
      { text: "and", startSec: 3.3, endSec: 3.5 },
      { text: "Heat", startSec: 3.6, endSec: 4.0 },
      { text: "Transfer.", startSec: 4.1, endSec: 4.8 },
      { text: "In", startSec: 5.2, endSec: 5.4 },
      { text: "mechanical", startSec: 5.5, endSec: 6.1 },
      { text: "engineering,", startSec: 6.2, endSec: 7.0 },
      { text: "energy", startSec: 7.3, endSec: 7.8 },
      { text: "transformation", startSec: 7.9, endSec: 8.7 },
      { text: "is", startSec: 8.8, endSec: 9.0 },
      { text: "fundamental", startSec: 9.1, endSec: 9.8 },
      { text: "to", startSec: 9.9, endSec: 10.1 },
      { text: "all", startSec: 10.2, endSec: 10.4 },
      { text: "modern", startSec: 10.5, endSec: 10.9 },
      { text: "power", startSec: 11.0, endSec: 11.4 },
      { text: "and", startSec: 11.5, endSec: 11.6 },
      { text: "propulsion", startSec: 11.7, endSec: 12.2 },
      { text: "systems.", startSec: 12.3, endSec: 12.8 },
    ],
  },
  {
    id: "seg-2",
    title: "2. The First Law of Thermodynamics",
    startSec: 13,
    endSec: 26,
    text: "The First Law states that energy cannot be created or destroyed, only altered in form. Mathematically, the change in internal energy equals heat added minus work done by the system.",
    words: [
      { text: "The", startSec: 13.0, endSec: 13.2 },
      { text: "First", startSec: 13.3, endSec: 13.6 },
      { text: "Law", startSec: 13.7, endSec: 14.1 },
      { text: "states", startSec: 14.2, endSec: 14.6 },
      { text: "that", startSec: 14.7, endSec: 14.9 },
      { text: "energy", startSec: 15.0, endSec: 15.5 },
      { text: "cannot", startSec: 15.6, endSec: 16.0 },
      { text: "be", startSec: 16.1, endSec: 16.3 },
      { text: "created", startSec: 16.4, endSec: 16.9 },
      { text: "or", startSec: 17.0, endSec: 17.2 },
      { text: "destroyed,", startSec: 17.3, endSec: 17.9 },
      { text: "only", startSec: 18.2, endSec: 18.5 },
      { text: "altered", startSec: 18.6, endSec: 19.1 },
      { text: "in", startSec: 19.2, endSec: 19.4 },
      { text: "form.", startSec: 19.5, endSec: 20.0 },
      { text: "Mathematically,", startSec: 20.3, endSec: 21.1 },
      { text: "the", startSec: 21.2, endSec: 21.4 },
      { text: "change", startSec: 21.5, endSec: 21.9 },
      { text: "in", startSec: 22.0, endSec: 22.2 },
      { text: "internal", startSec: 22.3, endSec: 22.8 },
      { text: "energy", startSec: 22.9, endSec: 23.3 },
      { text: "equals", startSec: 23.4, endSec: 23.8 },
      { text: "heat", startSec: 23.9, endSec: 24.3 },
      { text: "added", startSec: 24.4, endSec: 24.8 },
      { text: "minus", startSec: 24.9, endSec: 25.3 },
      { text: "work", startSec: 25.4, endSec: 25.7 },
      { text: "done", startSec: 25.8, endSec: 26.1 },
      { text: "by", startSec: 26.2, endSec: 26.3 },
      { text: "the", startSec: 26.4, endSec: 26.5 },
      { text: "system.", startSec: 26.6, endSec: 27.0 },
    ],
  },
  {
    id: "seg-3",
    title: "3. Modes of Heat Transfer",
    startSec: 27,
    endSec: 42,
    text: "Heat transfer occurs through three distinct mechanisms: conduction through solid matter, convection through moving fluids, and radiation via electromagnetic waves.",
    words: [
      { text: "Heat", startSec: 27.0, endSec: 27.4 },
      { text: "transfer", startSec: 27.5, endSec: 28.0 },
      { text: "occurs", startSec: 28.1, endSec: 28.5 },
      { text: "through", startSec: 28.6, endSec: 28.9 },
      { text: "three", startSec: 29.0, endSec: 29.4 },
      { text: "distinct", startSec: 29.5, endSec: 30.0 },
      { text: "mechanisms:", startSec: 30.1, endSec: 30.8 },
      { text: "conduction", startSec: 31.2, endSec: 31.9 },
      { text: "through", startSec: 32.0, endSec: 32.3 },
      { text: "solid", startSec: 32.4, endSec: 32.8 },
      { text: "matter,", startSec: 32.9, endSec: 33.5 },
      { text: "convection", startSec: 34.0, endSec: 34.7 },
      { text: "through", startSec: 34.8, endSec: 35.1 },
      { text: "moving", startSec: 35.2, endSec: 35.6 },
      { text: "fluids,", startSec: 35.7, endSec: 36.3 },
      { text: "and", startSec: 36.8, endSec: 37.0 },
      { text: "radiation", startSec: 37.1, endSec: 37.8 },
      { text: "via", startSec: 37.9, endSec: 38.3 },
      { text: "electromagnetic", startSec: 38.4, endSec: 39.4 },
      { text: "waves.", startSec: 39.5, endSec: 40.2 },
    ],
  },
];

/**
 * Generates an automated, realistic transcript with timed words
 * for any lesson title and duration if custom transcript is not found.
 */
export function generateTranscriptForLesson(
  lessonTitle: string,
  durationSec: number = 180
): TranscriptSegment[] {
  const topics = [
    {
      title: `1. Introduction to ${lessonTitle}`,
      text: `In this module, we explore the core principles of ${lessonTitle}. Understanding these concepts is essential for real-world mechanical and industrial systems.`,
    },
    {
      title: `2. Core Theoretical Foundations`,
      text: `We begin by analyzing the fundamental governing equations and physical laws that describe the underlying mechanisms of this discipline.`,
    },
    {
      title: `3. Analytical Methods and Modeling`,
      text: `Next, we look into computational modeling and experimental validation techniques commonly deployed by industry professionals today.`,
    },
    {
      title: `4. Industry Case Studies and Workflows`,
      text: `Let's examine how top engineering teams apply these principles to optimize performance, minimize thermal resistance, and ensure safety.`,
    },
    {
      title: `5. Summary and Next Steps`,
      text: `To wrap up, remember that these foundational ideas directly feed into the upcoming assessment and advanced design projects.`,
    },
  ];

  const segmentDuration = Math.max(15, Math.floor(durationSec / topics.length));

  return topics.map((t, idx) => {
    const startSec = idx * segmentDuration;
    const endSec = startSec + segmentDuration;
    const wordsRaw = t.text.split(/\s+/);
    const wordStep = (endSec - startSec) / Math.max(1, wordsRaw.length);

    const words: TranscriptWord[] = wordsRaw.map((w, wIdx) => ({
      text: w,
      startSec: Number((startSec + wIdx * wordStep).toFixed(2)),
      endSec: Number((startSec + (wIdx + 1) * wordStep - 0.05).toFixed(2)),
    }));

    return {
      id: `seg-${idx + 1}`,
      title: t.title,
      startSec,
      endSec,
      text: t.text,
      words,
    };
  });
}

/**
 * Returns transcript for a lesson by matching contentUrl, title, or ID.
 */
export function getTranscriptForLesson(
  lessonId: string,
  lessonTitle: string,
  durationSec?: number | null,
  contentUrl?: string | null
): TranscriptSegment[] {
  // If video is the SQL video or title is SQL
  if (
    (contentUrl && contentUrl.includes("3s0lFtUrhSQ")) ||
    lessonTitle.toLowerCase().includes("sql")
  ) {
    return SQL_VIDEO_TRANSCRIPT;
  }

  // If contentUrl is set to YouTube video 3s0lFtUrhSQ in database
  // or user wants this video as current lesson:
  const lower = lessonTitle.toLowerCase();
  if (lower.includes("thermodynamics") || lower.includes("heat transfer")) {
    // If user has put the SQL video link on Thermodynamics lesson
    if (contentUrl && contentUrl.includes("3s0lFtUrhSQ")) {
      return SQL_VIDEO_TRANSCRIPT;
    }
    return THERMODYNAMICS_TRANSCRIPT;
  }

  return generateTranscriptForLesson(lessonTitle, durationSec || 120);
}
