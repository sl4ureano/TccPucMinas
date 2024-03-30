--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: transaction_type_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public.transaction_type_enum AS ENUM (
    'compra',
    'transferencia',
    'extorno',
    'recarga'
);


ALTER TYPE public.transaction_type_enum OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.category (
    id integer NOT NULL,
    nome character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    "imgId" uuid
);


ALTER TABLE public.category OWNER TO root;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO root;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: file; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.file (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    path character varying NOT NULL
);


ALTER TABLE public.file OWNER TO root;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.product (
    id integer NOT NULL,
    nome character varying NOT NULL,
    preco numeric(6,2) NOT NULL,
    "isLoading" boolean DEFAULT false NOT NULL,
    "categoriaId" integer,
    "imagemId" uuid
);


ALTER TABLE public.product OWNER TO root;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO root;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.role OWNER TO root;

--
-- Name: session; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.session (
    id integer NOT NULL,
    hash character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    "userId" integer
);


ALTER TABLE public.session OWNER TO root;

--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.session_id_seq OWNER TO root;

--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.status OWNER TO root;

--
-- Name: transaction; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    total numeric(6,2) NOT NULL,
    "userId" integer,
    type public.transaction_type_enum DEFAULT 'compra'::public.transaction_type_enum NOT NULL
);


ALTER TABLE public.transaction OWNER TO root;

--
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_id_seq OWNER TO root;

--
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- Name: transaction_products_product; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.transaction_products_product (
    "transactionId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public.transaction_products_product OWNER TO root;

--
-- Name: user; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying,
    password character varying,
    provider character varying DEFAULT 'email'::character varying NOT NULL,
    "socialId" character varying,
    "firstName" character varying,
    "lastName" character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    "photoId" uuid,
    "roleId" integer,
    "statusId" integer,
    saldo numeric(8,2),
    "emailParent" character varying
);


ALTER TABLE public."user" OWNER TO root;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO root;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.category (id, nome, "createdAt", "updatedAt", "deletedAt", "imgId") FROM stdin;
7	Todos	2024-03-25 16:48:34.963718	2024-03-25 16:48:34.963718	\N	498cf5d1-be01-4b25-88d9-79a955fdae2c
8	Salgados	2024-03-25 18:14:54.411589	2024-03-25 18:14:54.411589	\N	d46c2e3e-0293-46a9-8b68-c7eaaa56b4d4
9	Bebidas	2024-03-25 18:18:20.930715	2024-03-25 18:18:20.930715	\N	5109017e-e206-4510-be60-e70b5baa2c15
10	Doces	2024-03-25 18:20:27.691129	2024-03-25 18:20:27.691129	\N	6aa80531-5ad8-4ea9-a1e3-2b59b0970147
11	Saudáveis	2024-03-25 18:20:47.640969	2024-03-25 18:20:47.640969	\N	ca0e6078-9f24-47a7-8352-7ce9d3dd2f29
12	Refeições	2024-03-25 18:21:07.520911	2024-03-25 18:21:07.520911	\N	d994d2a9-4a84-4f30-a988-7505f7aeb27a
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.file (id, path) FROM stdin;
3e56986c-d2e5-415c-90a2-0632643f3bab	/api/v1/files\\bbd593114b6cca94f179b.png
1b139733-fc15-4586-8710-66184d8cb021	/api/v1/files\\bd593114b6cca94f179b0.png
116c32ad-7e68-49d5-b1c6-4865fe35e020	/api/v1/files\\e0d7d410c333d29d9c9d0.png
f845b5da-171c-456b-b496-eb67d5f409d6	/api/v1/files\\db542e30721963a0656b6.jpg
498cf5d1-be01-4b25-88d9-79a955fdae2c	/api/v1/files\\9210386b76257d91670b5.png
d46c2e3e-0293-46a9-8b68-c7eaaa56b4d4	/api/v1/files\\10386b76257d91670b510.png
5109017e-e206-4510-be60-e70b5baa2c15	/api/v1/files\\b76257d91670b5103c1dd.png
6aa80531-5ad8-4ea9-a1e3-2b59b0970147	/api/v1/files\\76257d91670b5103c1dde.png
ca0e6078-9f24-47a7-8352-7ce9d3dd2f29	/api/v1/files\\6257d91670b5103c1ddef.png
d994d2a9-4a84-4f30-a988-7505f7aeb27a	/api/v1/files\\257d91670b5103c1ddeff.png
bf249dc1-0d98-4296-ac3a-275c4329853d	/api/v1/files\\24dc9dde549cc7194a6dc.jpg
319d12d2-1f17-4ee5-b7d8-4ad0097a0053	/api/v1/files\\f8753bec243f276b267ea.jpg
d2d2439b-9206-4bf9-b766-d2a972f0c35f	/api/v1/files\\8753bec243f276b267ea5.jpg
66f43635-1384-468d-a8ca-d2981c2b3b8f	/api/v1/files\\3bec243f276b267ea563c.png
4fffae96-5ae4-430d-a206-ce23d7714015	/api/v1/files\\bec243f276b267ea563c1.jpeg
5ba49817-a9a8-4b03-944c-1c05129c4ea3	/api/v1/files\\ec243f276b267ea563c11.png
f02a612a-8db1-4b0d-8e0e-3711a103f8b6	/api/v1/files\\c243f276b267ea563c11f.png
e937d0d3-33c6-4340-9bed-8110ccb913ed	/api/v1/files\\243f276b267ea563c11fa.jpg
45894964-937a-493b-b821-55291a24203e	/api/v1/files\\43f276b267ea563c11fa3.jpg
85134ac8-b437-4869-81ac-90458f8ed8af	/api/v1/files\\3f276b267ea563c11fa3e.jpg
eaa5d6df-2eb4-4d0a-8bb3-5e3adaf04ea0	/api/v1/files\\f276b267ea563c11fa3e9.jpg
6c9cb7f4-5f4a-4776-8fcb-70c781ec11bc	/api/v1/files\\267ea563c11fa3e979d5b.png
11056c6b-07c1-4796-9779-90462c8605d2	/api/v1/files\\67ea563c11fa3e979d5b0.png
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1709769642152	CreateUser1709769642152
2	1711289366439	CreateSaldo1711289366439
3	1711289754071	ChangeToDecimal1711289754071
4	1711308926270	CriandoProdutos1711308926270
5	1711309783809	CriandoTransacao1711309783809
6	1711317938274	ArrumandoTudo1711317938274
7	1711378733694	ArrumandoNBovamente1711378733694
8	1711407324032	AdicionandoImgProduto1711407324032
9	1711415619903	AdicionandoTransactionCerta1711415619903
10	1711488354189	AdicionandoPaisEFilhos1711488354189
11	1711488834946	VoltandoadicionandoPaisEFilhos1711488834946
12	1711495235535	PaiEfILHOSOUTRAVERSAO1711495235535
13	1711542067169	PaiEfILHOSvoltandoo1711542067169
14	1711562974163	Valormontariosaldo1711562974163
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.product (id, nome, preco, "isLoading", "categoriaId", "imagemId") FROM stdin;
19	Prato do Dia	21.00	f	12	319d12d2-1f17-4ee5-b7d8-4ad0097a0053
20	Banana	2.50	f	11	d2d2439b-9206-4bf9-b766-d2a972f0c35f
21	Cachorro Quente	5.20	f	8	66f43635-1384-468d-a8ca-d2981c2b3b8f
23	Hamburguer	5.10	f	8	4fffae96-5ae4-430d-a206-ce23d7714015
24	KitKat	6.50	f	10	5ba49817-a9a8-4b03-944c-1c05129c4ea3
22	Maçã	3.00	f	11	f02a612a-8db1-4b0d-8e0e-3711a103f8b6
26	Nescau	5.50	f	9	45894964-937a-493b-b821-55291a24203e
27	Refrigerante	6.00	f	9	85134ac8-b437-4869-81ac-90458f8ed8af
28	Salgado Assado	5.00	f	8	eaa5d6df-2eb4-4d0a-8bb3-5e3adaf04ea0
25	Sanduiche N	12.00	f	11	e937d0d3-33c6-4340-9bed-8110ccb913ed
29	Pão de Queijo	4.00	f	8	6c9cb7f4-5f4a-4776-8fcb-70c781ec11bc
30	Mini Pizza	4.00	f	8	11056c6b-07c1-4796-9779-90462c8605d2
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.role (id, name) FROM stdin;
2	User
1	Admin
3	Lunch
4	Child
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.session (id, hash, "createdAt", "updatedAt", "deletedAt", "userId") FROM stdin;
347	a1d99449275921e51b8fd7020d6925f123c28a0a92db8e279663c6ae977d7ef3	2024-03-30 13:17:14.452516	2024-03-30 13:17:14.452516	\N	76
348	462b6518a3b342ac099e9e4c2bc4671ddafb179a64c5a7f49509f53b97f79def	2024-03-30 13:18:24.46167	2024-03-30 13:18:24.46167	\N	78
349	7a907680ee1b71ca5c543aea248bd1975acdfc3dd2e9fe46bf0ead5e97e9137d	2024-03-30 13:18:31.892584	2024-03-30 13:18:31.892584	\N	78
350	09f2d72c5e3933be1d2e09db0e206fb5f1da3cf8cb66301eb3d718992e2a37c1	2024-03-30 13:19:03.642968	2024-03-30 13:19:03.642968	\N	78
351	37cd5dde62ad68b196d328137f7a29ce57d10ddbe0f7024a1eef5ea084f9691e	2024-03-30 13:21:44.672744	2024-03-30 13:21:44.672744	\N	78
352	cfddef7211c4cebabf03fe7c1b36a0e4f8b2e7ce3679ae490fc721ec263b6d58	2024-03-30 13:23:15.141017	2024-03-30 13:23:15.141017	\N	78
353	93766f4f479ebefad15a36512add5eb5432a312f9c693103afc2757c6a287706	2024-03-30 13:24:40.401202	2024-03-30 13:24:40.401202	\N	78
354	c8fff7e304858d4e7130c43d6734694cf095fbbc310cd8ef8ebf8940ab8d21f8	2024-03-30 13:25:04.489177	2024-03-30 13:25:04.489177	\N	78
355	aac40c42de750669b4eda92ba5004e15534aeea1993b5416b3a893e37aa1fc22	2024-03-30 13:26:43.367555	2024-03-30 13:26:43.367555	\N	78
356	1160924090c41b096963e71e6923490b1bc6e42b302e0adcc539215689eb17a5	2024-03-30 13:27:46.988831	2024-03-30 13:27:46.988831	\N	78
357	bea2de0ff44fa493d7216e7e1802000fa48bfccbd737fb226ab3bc1bc13162e9	2024-03-30 13:31:19.361444	2024-03-30 13:31:19.361444	\N	78
358	c15f5639c03e4f8b1394fe6e63ccbbfaf852c9085d0c089dae288f61ad96afa9	2024-03-30 13:32:14.7707	2024-03-30 13:32:14.7707	\N	78
359	36090f6f410ddb7d099fea7aa0592f7f1c4b7a0dfedf2b1db979563e6b901ca8	2024-03-30 13:32:54.254519	2024-03-30 13:32:54.254519	\N	73
360	a86930f18bed7a181650becdb1160544eba4096165e2e2fe8fb34f7ed5e0b579	2024-03-30 13:45:56.910091	2024-03-30 13:45:56.910091	\N	73
361	e6a5768177704493cbc7a318f1fcd0930a468e206fd820a30829f599e744d52f	2024-03-30 13:48:56.577092	2024-03-30 13:48:56.577092	\N	78
362	aaf1676df42a5018ebddf70af1f77babe259cd8f363cfa34a552bfa68f2f7d1b	2024-03-30 13:55:24.26749	2024-03-30 13:55:24.26749	\N	73
363	1a86fa52bef50d214909da5cbc898b235f907213df6043fd3bf2a104f46b3120	2024-03-30 13:55:53.672099	2024-03-30 13:55:53.672099	\N	73
364	b29bfefd8fe133369871bded244f3d9a04d0d0f4888522dcb96e4f80309f2fef	2024-03-30 13:57:26.222509	2024-03-30 13:57:26.222509	\N	73
365	25f1689aa3f1133d8e0dd6b757cf75ebfec02444d22f9ad61ae8b73b93aa8f35	2024-03-30 13:58:00.190687	2024-03-30 13:58:00.190687	\N	73
366	650d5ab2e2632f86bf5b078de4be3506a81ca0c2c6e93b86788b1db067d377fb	2024-03-30 14:00:01.134458	2024-03-30 14:00:01.134458	\N	73
367	93297372fac638cc9ff7a753d871e1d06e8b74e803f30dd308979e89d832031c	2024-03-30 14:00:46.141486	2024-03-30 14:00:46.141486	\N	78
368	4f7bdba389851d840c33c304b1b76984030be24021730f03d94bdc4b7d9e2c36	2024-03-30 14:02:13.0993	2024-03-30 14:02:13.0993	\N	76
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.status (id, name) FROM stdin;
1	Active
2	Inactive
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.transaction (id, "createdAt", "updatedAt", "deletedAt", total, "userId", type) FROM stdin;
\.


--
-- Data for Name: transaction_products_product; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.transaction_products_product ("transactionId", "productId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."user" (id, email, password, provider, "socialId", "firstName", "lastName", "createdAt", "updatedAt", "deletedAt", "photoId", "roleId", "statusId", saldo, "emailParent") FROM stdin;
76	allshop@live.com	$2a$10$HDvl3MzcBrDQ0JVsE0nAfeRQefcm9eJGZKEbFCfA0BOdjS.qpdcE2	email	\N	Adriano	Laureano	2024-03-28 16:49:53.197119	2024-03-28 16:49:53.197119	\N	\N	2	1	0.00	\N
73	99999999@saborito.com.br	$2a$10$8OTPf7JbGNF8k3OYFkj/guoqRgtesfZRiUXqblD1.TJTapLyaOaCS	email	99999999	João	Miguel	2024-03-27 13:01:19.923983	2024-03-29 23:29:50.060564	\N	f845b5da-171c-456b-b496-eb67d5f409d6	4	1	0.00	allshop@live.com
77	88888888@saborito.com.br	$2a$10$8OTPf7JbGNF8k3OYFkj/guoqRgtesfZRiUXqblD1.TJTapLyaOaCS	email	99999999	Pedro	Paulo	2024-03-27 13:01:19.923983	2024-03-29 23:29:50.060564	\N	f845b5da-171c-456b-b496-eb67d5f409d6	4	1	0.00	allshop@live.com
78	admin@live.com	$2a$10$HDvl3MzcBrDQ0JVsE0nAfeRQefcm9eJGZKEbFCfA0BOdjS.qpdcE2	email	\N	Cantina	Saborito	2024-03-28 16:49:53.197119	2024-03-28 16:49:53.197119	\N	\N	1	1	0.00	\N
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.category_id_seq', 12, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.migrations_id_seq', 14, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.product_id_seq', 30, true);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.session_id_seq', 368, true);


--
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.transaction_id_seq', 244, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.user_id_seq', 78, true);


--
-- Name: file PK_36b46d232307066b3a2c9ea3a1d; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY (id);


--
-- Name: transaction_products_product PK_7ddf967cc5b99d0e61028fde7a2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transaction_products_product
    ADD CONSTRAINT "PK_7ddf967cc5b99d0e61028fde7a2" PRIMARY KEY ("transactionId", "productId");


--
-- Name: transaction PK_89eadb93a89810556e1cbcd6ab9; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: status PK_e12743a7086ec826733f54e1d95; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY (id);


--
-- Name: session PK_f55da76ac1c3ac420f444d2ff11; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY (id);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_3d2f174ef04fb312fdebd0ddc5; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON public.session USING btree ("userId");


--
-- Name: IDX_58e4dbff0e1a32a9bdc861bb29; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON public."user" USING btree ("firstName");


--
-- Name: IDX_665cfcbd54ab3dfbe8f6e50212; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_665cfcbd54ab3dfbe8f6e50212" ON public."user" USING btree (saldo);


--
-- Name: IDX_68824835399f247b49695a7118; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_68824835399f247b49695a7118" ON public."user" USING btree ("emailParent");


--
-- Name: IDX_9bd2fe7a8e694dedc4ec2f666f; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON public."user" USING btree ("socialId");


--
-- Name: IDX_9cc6383ab5794c26fef12a42d2; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_9cc6383ab5794c26fef12a42d2" ON public.transaction_products_product USING btree ("transactionId");


--
-- Name: IDX_d5538d5c1e50e9e1c7a5bd909f; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_d5538d5c1e50e9e1c7a5bd909f" ON public.transaction_products_product USING btree ("productId");


--
-- Name: IDX_f0e1b4ecdca13b177e2e3a0613; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON public."user" USING btree ("lastName");


--
-- Name: session FK_3d2f174ef04fb312fdebd0ddc53; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: product FK_4571d9be1660f363029320af4da; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_4571d9be1660f363029320af4da" FOREIGN KEY ("categoriaId") REFERENCES public.category(id);


--
-- Name: transaction FK_605baeb040ff0fae995404cea37; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user FK_75e2be4ce11d447ef43be0e374f; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES public.file(id);


--
-- Name: transaction_products_product FK_9cc6383ab5794c26fef12a42d26; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transaction_products_product
    ADD CONSTRAINT "FK_9cc6383ab5794c26fef12a42d26" FOREIGN KEY ("transactionId") REFERENCES public.transaction(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: category FK_adfbfd64aa652b27278e43585db; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "FK_adfbfd64aa652b27278e43585db" FOREIGN KEY ("imgId") REFERENCES public.file(id);


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- Name: product FK_d4b706fb9e3e867f0e6dbfaad4f; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_d4b706fb9e3e867f0e6dbfaad4f" FOREIGN KEY ("imagemId") REFERENCES public.file(id);


--
-- Name: transaction_products_product FK_d5538d5c1e50e9e1c7a5bd909f5; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transaction_products_product
    ADD CONSTRAINT "FK_d5538d5c1e50e9e1c7a5bd909f5" FOREIGN KEY ("productId") REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user FK_dc18daa696860586ba4667a9d31; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES public.status(id);


--
-- PostgreSQL database dump complete
--

