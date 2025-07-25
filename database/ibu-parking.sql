PGDMP  6    1                }           ibu-parking    17.4    17.4 N    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16538    ibu-parking    DATABASE     o   CREATE DATABASE "ibu-parking" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "ibu-parking";
                     postgres    false            �            1259    21681    administrators    TABLE     6  CREATE TABLE public.administrators (
    admin_id integer NOT NULL,
    email text,
    google_id text,
    picture_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    login_count numeric DEFAULT 0,
    role text DEFAULT 'admin'::text
);
 "   DROP TABLE public.administrators;
       public         heap r       postgres    false            �            1259    21680    administrators_admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.administrators_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.administrators_admin_id_seq;
       public               postgres    false    242            �           0    0    administrators_admin_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.administrators_admin_id_seq OWNED BY public.administrators.admin_id;
          public               postgres    false    241            �            1259    21643    notifications    TABLE     �   CREATE TABLE public.notifications (
    id integer NOT NULL,
    type text,
    title text,
    message text,
    date date,
    priority text,
    icon text
);
 !   DROP TABLE public.notifications;
       public         heap r       postgres    false            �            1259    21642    notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.notifications_id_seq;
       public               postgres    false    240            �           0    0    notifications_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;
          public               postgres    false    239            �            1259    16966    parking_slots    TABLE       CREATE TABLE public.parking_slots (
    id integer NOT NULL,
    slot_code text,
    location text,
    is_available boolean,
    reserved_by integer,
    reserved_at timestamp with time zone,
    section text,
    type text,
    is_locked boolean,
    status text
);
 !   DROP TABLE public.parking_slots;
       public         heap r       postgres    false            �            1259    16969    parking_slots_id_seq    SEQUENCE     �   CREATE SEQUENCE public.parking_slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.parking_slots_id_seq;
       public               postgres    false    233            �           0    0    parking_slots_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.parking_slots_id_seq OWNED BY public.parking_slots.id;
          public               postgres    false    234            �            1259    21634    ratings    TABLE     |   CREATE TABLE public.ratings (
    id integer NOT NULL,
    name text,
    role text,
    comment text,
    rating bigint
);
    DROP TABLE public.ratings;
       public         heap r       postgres    false            �            1259    21633    ratings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ratings_id_seq;
       public               postgres    false    238            �           0    0    ratings_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;
          public               postgres    false    237            �            1259    21750    reports    TABLE     �   CREATE TABLE public.reports (
    id integer NOT NULL,
    category text,
    priority text,
    issue_title text,
    description text,
    picture_url text,
    student_id integer NOT NULL
);
    DROP TABLE public.reports;
       public         heap r       postgres    false            �            1259    21748    reports_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reports_id_seq;
       public               postgres    false    249            �           0    0    reports_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;
          public               postgres    false    247            �            1259    21749    reports_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reports_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.reports_student_id_seq;
       public               postgres    false    249            �           0    0    reports_student_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.reports_student_id_seq OWNED BY public.reports.student_id;
          public               postgres    false    248            �            1259    21713    reservations    TABLE       CREATE TABLE public.reservations (
    id integer NOT NULL,
    reservations_start_date timestamp with time zone,
    reservations_end_date timestamp with time zone,
    student_id integer NOT NULL,
    parking_slot_id integer NOT NULL,
    status text DEFAULT 'pending'::text
);
     DROP TABLE public.reservations;
       public         heap r       postgres    false            �            1259    21710    reservations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.reservations_id_seq;
       public               postgres    false    245            �           0    0    reservations_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;
          public               postgres    false    243            �            1259    21734     reservations_parking_slot_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservations_parking_slot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.reservations_parking_slot_id_seq;
       public               postgres    false    245            �           0    0     reservations_parking_slot_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.reservations_parking_slot_id_seq OWNED BY public.reservations.parking_slot_id;
          public               postgres    false    246            �            1259    21712    reservations_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reservations_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.reservations_student_id_seq;
       public               postgres    false    245            �           0    0    reservations_student_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.reservations_student_id_seq OWNED BY public.reservations.student_id;
          public               postgres    false    244            �            1259    21609    students    TABLE     1  CREATE TABLE public.students (
    student_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    google_id character varying(255) NOT NULL,
    picture_url text,
    password character varying(255),
    role character varying(255) DEFAULT 'student'::character varying NOT NULL,
    login_count integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.students;
       public         heap r       postgres    false            �            1259    21608    students_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.students_student_id_seq;
       public               postgres    false    236            �           0    0    students_student_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.student_id;
          public               postgres    false    235            �            1259    21765    unauthorized    TABLE     N   CREATE TABLE public.unauthorized (
    id integer NOT NULL,
    email text
);
     DROP TABLE public.unauthorized;
       public         heap r       postgres    false            �            1259    21764    unauthorized_id_seq    SEQUENCE     �   CREATE SEQUENCE public.unauthorized_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.unauthorized_id_seq;
       public               postgres    false    251            �           0    0    unauthorized_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.unauthorized_id_seq OWNED BY public.unauthorized.id;
          public               postgres    false    250            �           2604    21684    administrators admin_id    DEFAULT     �   ALTER TABLE ONLY public.administrators ALTER COLUMN admin_id SET DEFAULT nextval('public.administrators_admin_id_seq'::regclass);
 F   ALTER TABLE public.administrators ALTER COLUMN admin_id DROP DEFAULT;
       public               postgres    false    242    241    242            �           2604    21646    notifications id    DEFAULT     t   ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);
 ?   ALTER TABLE public.notifications ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    239    240    240            �           2604    16970    parking_slots id    DEFAULT     t   ALTER TABLE ONLY public.parking_slots ALTER COLUMN id SET DEFAULT nextval('public.parking_slots_id_seq'::regclass);
 ?   ALTER TABLE public.parking_slots ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    234    233            �           2604    21637 
   ratings id    DEFAULT     h   ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);
 9   ALTER TABLE public.ratings ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    238    237    238            �           2604    21753 
   reports id    DEFAULT     h   ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);
 9   ALTER TABLE public.reports ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    249    247    249            �           2604    21754    reports student_id    DEFAULT     x   ALTER TABLE ONLY public.reports ALTER COLUMN student_id SET DEFAULT nextval('public.reports_student_id_seq'::regclass);
 A   ALTER TABLE public.reports ALTER COLUMN student_id DROP DEFAULT;
       public               postgres    false    248    249    249            �           2604    21716    reservations id    DEFAULT     r   ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);
 >   ALTER TABLE public.reservations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    243    245    245            �           2604    21718    reservations student_id    DEFAULT     �   ALTER TABLE ONLY public.reservations ALTER COLUMN student_id SET DEFAULT nextval('public.reservations_student_id_seq'::regclass);
 F   ALTER TABLE public.reservations ALTER COLUMN student_id DROP DEFAULT;
       public               postgres    false    244    245    245            �           2604    21735    reservations parking_slot_id    DEFAULT     �   ALTER TABLE ONLY public.reservations ALTER COLUMN parking_slot_id SET DEFAULT nextval('public.reservations_parking_slot_id_seq'::regclass);
 K   ALTER TABLE public.reservations ALTER COLUMN parking_slot_id DROP DEFAULT;
       public               postgres    false    246    245            �           2604    21612    students student_id    DEFAULT     z   ALTER TABLE ONLY public.students ALTER COLUMN student_id SET DEFAULT nextval('public.students_student_id_seq'::regclass);
 B   ALTER TABLE public.students ALTER COLUMN student_id DROP DEFAULT;
       public               postgres    false    236    235    236            �           2604    21768    unauthorized id    DEFAULT     r   ALTER TABLE ONLY public.unauthorized ALTER COLUMN id SET DEFAULT nextval('public.unauthorized_id_seq'::regclass);
 >   ALTER TABLE public.unauthorized ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    251    250    251            v          0    21681    administrators 
   TABLE DATA           |   COPY public.administrators (admin_id, email, google_id, picture_url, created_at, updated_at, login_count, role) FROM stdin;
    public               postgres    false    242   ^       t          0    21643    notifications 
   TABLE DATA           W   COPY public.notifications (id, type, title, message, date, priority, icon) FROM stdin;
    public               postgres    false    240   �^       m          0    16966    parking_slots 
   TABLE DATA           �   COPY public.parking_slots (id, slot_code, location, is_available, reserved_by, reserved_at, section, type, is_locked, status) FROM stdin;
    public               postgres    false    233   a       r          0    21634    ratings 
   TABLE DATA           B   COPY public.ratings (id, name, role, comment, rating) FROM stdin;
    public               postgres    false    238   ^c       }          0    21750    reports 
   TABLE DATA           l   COPY public.reports (id, category, priority, issue_title, description, picture_url, student_id) FROM stdin;
    public               postgres    false    249   �d       y          0    21713    reservations 
   TABLE DATA              COPY public.reservations (id, reservations_start_date, reservations_end_date, student_id, parking_slot_id, status) FROM stdin;
    public               postgres    false    245   .f       p          0    21609    students 
   TABLE DATA           �   COPY public.students (student_id, first_name, last_name, email, google_id, picture_url, password, role, login_count, created_at, updated_at) FROM stdin;
    public               postgres    false    236   �f                 0    21765    unauthorized 
   TABLE DATA           1   COPY public.unauthorized (id, email) FROM stdin;
    public               postgres    false    251   _k       �           0    0    administrators_admin_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.administrators_admin_id_seq', 3, true);
          public               postgres    false    241            �           0    0    notifications_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.notifications_id_seq', 13, true);
          public               postgres    false    239            �           0    0    parking_slots_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.parking_slots_id_seq', 258, true);
          public               postgres    false    234            �           0    0    ratings_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.ratings_id_seq', 7, true);
          public               postgres    false    237            �           0    0    reports_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.reports_id_seq', 6, true);
          public               postgres    false    247            �           0    0    reports_student_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reports_student_id_seq', 1, false);
          public               postgres    false    248            �           0    0    reservations_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.reservations_id_seq', 59, true);
          public               postgres    false    243            �           0    0     reservations_parking_slot_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.reservations_parking_slot_id_seq', 1, true);
          public               postgres    false    246            �           0    0    reservations_student_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.reservations_student_id_seq', 1, false);
          public               postgres    false    244            �           0    0    students_student_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.students_student_id_seq', 28, true);
          public               postgres    false    235            �           0    0    unauthorized_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.unauthorized_id_seq', 1, false);
          public               postgres    false    250            �           2606    21688 "   administrators administrators_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.administrators
    ADD CONSTRAINT administrators_pkey PRIMARY KEY (admin_id);
 L   ALTER TABLE ONLY public.administrators DROP CONSTRAINT administrators_pkey;
       public                 postgres    false    242            �           2606    21650     notifications notifications_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public                 postgres    false    240            �           2606    16977 !   parking_slots parking_slots_pkey1 
   CONSTRAINT     _   ALTER TABLE ONLY public.parking_slots
    ADD CONSTRAINT parking_slots_pkey1 PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.parking_slots DROP CONSTRAINT parking_slots_pkey1;
       public                 postgres    false    233            �           2606    21641    ratings ratings_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_pkey;
       public                 postgres    false    238            �           2606    21758    reports reports_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_pkey;
       public                 postgres    false    249            �           2606    21720    reservations reservations_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_pkey;
       public                 postgres    false    245            �           2606    21622    students students_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.students DROP CONSTRAINT students_email_key;
       public                 postgres    false    236            �           2606    21624    students students_google_id_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_google_id_key UNIQUE (google_id);
 I   ALTER TABLE ONLY public.students DROP CONSTRAINT students_google_id_key;
       public                 postgres    false    236            �           2606    21620    students students_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public                 postgres    false    236            �           2606    21772    unauthorized unauthorized_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.unauthorized
    ADD CONSTRAINT unauthorized_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.unauthorized DROP CONSTRAINT unauthorized_pkey;
       public                 postgres    false    251            �           2606    21625 ,   parking_slots parking_slots_reserved_by_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parking_slots
    ADD CONSTRAINT parking_slots_reserved_by_fkey FOREIGN KEY (reserved_by) REFERENCES public.students(student_id) NOT VALID;
 V   ALTER TABLE ONLY public.parking_slots DROP CONSTRAINT parking_slots_reserved_by_fkey;
       public               postgres    false    3531    233    236            �           2606    21759    reports reports_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id);
 I   ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_student_id_fkey;
       public               postgres    false    3531    236    249            �           2606    21740 .   reservations reservations_parking_slot_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_parking_slot_id_fkey FOREIGN KEY (parking_slot_id) REFERENCES public.parking_slots(id) NOT VALID;
 X   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_parking_slot_id_fkey;
       public               postgres    false    233    3525    245            �           2606    21726 )   reservations reservations_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id);
 S   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_student_id_fkey;
       public               postgres    false    236    3531    245            v   �   x�E�MK�0 �s�+v��o��d��]u�0A�.%�4cm�&;�ߋ'��#�O���B����x�tc1R������(��\���� YH)��k����O��4�]ݴ�&��[������uKw�F���0��y�[��}Z��>���l6y��BS@��JH��S�������+ ��Ӛ!�_��8UGVU�/��;`      t     x�mSKs�0>�_���pHsM�t��d������VH�$���
ʡ'`���ȅE�[���	�.��@���� ��zu���jth��:�\'���T
���'��.6/�	%O�a������RYQ��]�݋VZ��i�.mO%�@E.�G�l���h\�`���	�"�>L8�	{�JO5c�y�4�A�H��h	�'�|�C�9����g�Q-�n�f4��AZ����NVQ���פ��`KVaE]��J�f���3�_���5���+�˼;X� ^^M��.��]�<W
eN2� CԮNn'7���y�h�5��Ñ���"�g��q7����c��d�]h�DKx��=�3����Xn@5��)fS��GGI9���uc�<qL&��)p�Z�ׯ7��<�OJ�&����Z�&#^$Бܙ]���5���M�`m"�)��Z ��W�.�򒑹n�-r6 ^�!Ac�8�C�/Ř�U���׽���j����8�����m��2I����+�      m   L  x����j�P���O�',]����+��鮛�:3a�l�з���T�����@�C?Gҹ�z�]��ƶ����^7����_�������i�cx�1�=PƷ��7�C������Q0�!�s���v���.�����24��c1�*����*k�E��E���K�94��yT�C���E@��|Ηi]��?�"`[�8����W8�WP�q���oGP%ʯ�@���;��Ř/F�_T0�`�Y�;Է^G�TCB+(�Df��-)U
��ˤ����7��l�aO�o&��j��ڤ�����
�7$BH����G�{:w�̳g-�(�YΣt?0m��&c&iz�y4���g�K��<���A��_f.�h�V�]���8���m�C��]1i����}C��@�E�<z,�rmq��� /����v��=~v�`�%�����B��\��!S��5%��d�]���P�B�a�kT��-fX�:�0����,6O�3lY=]�!�5�yˬMKײ���*��X2�[��_�ؼ����\c�l"��#E��ト�Ydc{��ۧ	�V2|-Ї�`��)C�����T�P��]�<}+���A��      r   X  x�œAn�@EףS0���u�v�q�E�e7����9���b=X(�gQ�Kb��Ġp@��$e����B
�Ȕ#��5�����!zGK��+Ą���L�/ꖠG�pn@2D�a���(Ad����*C��YZϢ`����!lR�C��s�2g2�M�qf+��=�1(��`W+ԁ�4�e��#�<W�''Aw](0%��	Ǚ}R������1|Ge�jd��8�t�{��"#AY�������B�禝�jp���`,�hJ�Y���γ�=�H�5�����W���������{�u�v��S�d�x��öN~�_��-���ZN7��^UU�
"-B      }   X  x��QAn� <�W��81�#�J��clc/��V�}qbUJO������2���ƕ���Hk0b�c8�N��;�x�J��<�O�0ǜ����T��ȕ�k�W�>��8	f��FF�v˘8���ۛ\��J�t�o��	/E%�������~ �IL�JH�ע�Lw�$~%�M�hhW:�t���ՒwoZ:[�eit�q�� E�i� �]��!E�v�ˁ:;�TG"_7R�J0ɤ̥�(�Cϲ���d�cG{��0���#���[�@\��O�t�]C-�D��ʅL9Rjv&�䳆���}�/30��ˢ�U.tɕdj7y9fY�����      y   w   x���1
�0й9��TӴ�ճ�H[��t��� �d��>I�(Bb�����{z�'���;V��b���i�[I�$(	������Ϊ�#�c���Q�^���I�M�A���g��	�  �?l�      p   �  x���[��H���_��袀L&9\�&"���I��A����~왓��L2��wV*뫽Sbʩ/L-�2ƲϚ�?��|i��:/�dy��81��(����������i�:������^G"n.�Aʹ&6H��W�RLW*��t��ȝ�Q9HZ/�K�q��(���Gx��aa��R^1Dc@'�w $���ҿ�K�蝤� y�%�� 3���M�U��H���0NDMD�LDt�(R4�X��>_j����/G�����9��w������$@�R��ԟ
�/��t��#�w��g(DC���k�,G��ԗ��n�! �S0`y��I�ߛ��fI��E�&��$���k���`z�[�u�ߜ�s��㺇�������6�\�y}(�i�;���w0�]uK#m��#ޯً�SRh	���\�γ(XG��Ə
�<df�c�M�=�K��Cn�~hu�pP�]4F��py74C*�H֦�{���)w�Ke8�9��zRDe#Mo�����7^��+7=�W�j뻹�,Z��P:�b^��i�{ �=��w�d�:��xL��(H��6��e��5�,>��w�,׌>>-�9�=a�f��y0ظ/̜��˨�N�Ӭ�cΘ�}4��S�W>�܅ݭ3�<8hǳ��g��ݚ�'�8�ƥ�cNo�W�Caϻ�2u|�@�RGѕ��w�-ГX	{�����d����7�&�i�fT�Z�=X��}o����uѧ�$�rr�[��d�_���{Mf�2FťȋI�n�8��m��	5^�`s����Z�z�q�K�lk��$<ף�g���L�h8����A����j�g�	�[�$�r�=�n@y(�4��S�D���ٻ�W�U<=\��L@)w��j�(Ń*&��I�}>o�&�|���9���_�M�'�]�-����Z�?�u(�Rr�c�=�S�^U�j��9�zFs�I&ZC#ݠ�Ѻ.z@r�
yY�x(H<5��2k����q�]����Xhc�i�Z�D)��R
�u6�s��7�2L�Fhg��=��.[���MW�'&S��/	�>��}�b�MfK�S�Z1ϴW�V�<ZQ~�,�i���8<n�5�fU5յwW$<w��S=��S�/��z%9E֕Q��қҼ=��+�E#��F��	KP�[$Q�3���$���g$�A����	�� �            x������ � �     