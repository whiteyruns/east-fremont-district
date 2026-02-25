#!/bin/bash
# East Fremont District — Venue Photo Downloader
# Run this script from your local machine to download all venue photos.
# Total: 69 photos across 16 venues
# Photos are organized into folders by venue slug.

BASE_DIR="./venue-photos"

# Commonwealth (9 photos)
mkdir -p "$BASE_DIR/commonwealth"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514505263-UM1OC5K5ZSO8RAEA5FYO/Commonwealth+Interior+15+Warmer_1920.jpg" && echo "  ✓ commonwealth-01.jpg" || echo "  ✗ commonwealth-01.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514542891-NRPWGA23XMERULZ9CXD6/Commonwealth+Exterior+3_1920.jpg" && echo "  ✓ commonwealth-02.jpg" || echo "  ✗ commonwealth-02.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514565811-QGEGVBXO1ISCJ54DUBHP/Commonwealth+Exterior+4_1920.jpg" && echo "  ✓ commonwealth-03.jpg" || echo "  ✗ commonwealth-03.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-04.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514695182-29YUYXQAP0XPGDWZUL6V/Commonwealth+Cocktail+3_1920.jpg" && echo "  ✓ commonwealth-04.jpg" || echo "  ✗ commonwealth-04.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-05.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514609538-1RLTFABJ9TASS4OSDI8W/Commonwealth+Exterior+6_1920.jpg" && echo "  ✓ commonwealth-05.jpg" || echo "  ✗ commonwealth-05.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-06.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514691587-Z5XUEW80PR3UUN7POCXL/Commonwealth+Cocktail+4_1920.jpg" && echo "  ✓ commonwealth-06.jpg" || echo "  ✗ commonwealth-06.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-07.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514437712-8NMN4OZ6E26LT4V8TBFK/Commonwealth+Interior+3+Warmer_1920.jpg" && echo "  ✓ commonwealth-07.jpg" || echo "  ✗ commonwealth-07.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-08.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/1598514483950-KA64P1LWZEAXVGS8AMQT/Commonwealth+Interior+7+Warmer_1920.jpg" && echo "  ✓ commonwealth-08.jpg" || echo "  ✗ commonwealth-08.jpg FAILED"
curl -sL -o "$BASE_DIR/commonwealth/commonwealth-09.jpg" "https://images.squarespace-cdn.com/content/v1/5e82b0c06bee1b659b287f09/eec434cc-597b-442a-ba71-f276b1d6af19/opiumden.jpg" && echo "  ✓ commonwealth-09.jpg" || echo "  ✗ commonwealth-09.jpg FAILED"

# Doberman / Drawing Room (7 photos)
mkdir -p "$BASE_DIR/doberman"
curl -sL -o "$BASE_DIR/doberman/doberman-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/ea7554fb-8a1d-4449-ba2e-8e8d6ddc7a80/Doberman+1+-+Anthony+Mair.jpg" && echo "  ✓ doberman-01.jpg" || echo "  ✗ doberman-01.jpg FAILED"
curl -sL -o "$BASE_DIR/doberman/doberman-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/358ac25e-2211-4497-9fb1-12dd6e490fd6/Doberman+2+-+Anthony+Mair.jpg" && echo "  ✓ doberman-02.jpg" || echo "  ✗ doberman-02.jpg FAILED"
curl -sL -o "$BASE_DIR/doberman/doberman-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/01c9cd69-1047-4441-a32e-f14d9c4b5009/Doberman+3+-+Anthony+Mair.jpg" && echo "  ✓ doberman-03.jpg" || echo "  ✗ doberman-03.jpg FAILED"
curl -sL -o "$BASE_DIR/doberman/doberman-04.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1856883f-83a9-401c-8d69-6502e9e2161a/Doberman+4+-+Anthony+Mair.jpg" && echo "  ✓ doberman-04.jpg" || echo "  ✗ doberman-04.jpg FAILED"
curl -sL -o "$BASE_DIR/doberman/doberman-05.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/6d9c8e2f-773f-4121-ad69-9a74e09677d0/Doberman+5+-+Anthony+Mair.jpg" && echo "  ✓ doberman-05.jpg" || echo "  ✗ doberman-05.jpg FAILED"
curl -sL -o "$BASE_DIR/doberman/doberman-06.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1c2e4b89-e802-49a2-9797-79437bde0077/Doberman+6+-+Anthony+Mair.jpg" && echo "  ✓ doberman-06.jpg" || echo "  ✗ doberman-06.jpg FAILED"
curl -sL -o "$BASE_DIR/doberman/doberman-07.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/e16f94bc-62aa-4c9d-8428-b95ae5e77f97/Doberman+13+-+Anthony+Mair.jpg" && echo "  ✓ doberman-07.jpg" || echo "  ✗ doberman-07.jpg FAILED"

# We All Scream (5 photos)
mkdir -p "$BASE_DIR/we-all-scream"
curl -sL -o "$BASE_DIR/we-all-scream/we-all-scream-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1657608675504-8BDKGRF5MB920QQIV6KX/We+All+Scream+-+Anthony+Mair+-+24.jpg" && echo "  ✓ we-all-scream-01.jpg" || echo "  ✗ we-all-scream-01.jpg FAILED"
curl -sL -o "$BASE_DIR/we-all-scream/we-all-scream-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1657608673929-5DDYQTJTHHO2E9KLHX0L/We+All+Scream+-+Anthony+Mair+-+22.jpg" && echo "  ✓ we-all-scream-02.jpg" || echo "  ✗ we-all-scream-02.jpg FAILED"
curl -sL -o "$BASE_DIR/we-all-scream/we-all-scream-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1657608672410-TYW3AIJW76PXECJSM3GK/We+All+Scream+-+Anthony+Mair+-+21.jpg" && echo "  ✓ we-all-scream-03.jpg" || echo "  ✗ we-all-scream-03.jpg FAILED"
curl -sL -o "$BASE_DIR/we-all-scream/we-all-scream-04.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1657608670717-Z3SDTGLZ7W2NBHM9G9X1/We+All+Scream+-+Anthony+Mair+-+20.jpg" && echo "  ✓ we-all-scream-04.jpg" || echo "  ✗ we-all-scream-04.jpg FAILED"
curl -sL -o "$BASE_DIR/we-all-scream/we-all-scream-05.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1657608665704-IQHZ6JO32S6PTQW8SG94/We+All+Scream+-+Anthony+Mair+-+15.jpg" && echo "  ✓ we-all-scream-05.jpg" || echo "  ✗ we-all-scream-05.jpg FAILED"

# Cheapshot (4 photos)
mkdir -p "$BASE_DIR/cheapshot"
curl -sL -o "$BASE_DIR/cheapshot/cheapshot-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1651596468595-NGLAFAUK3DTVOU0VXJJZ/Cheapshot+Interior+1+-+Anthony+Mair+R1.jpg" && echo "  ✓ cheapshot-01.jpg" || echo "  ✗ cheapshot-01.jpg FAILED"
curl -sL -o "$BASE_DIR/cheapshot/cheapshot-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1651596471118-98N76DGNVKB0AXVYGMAE/Cheapshot+Interior+2+-+Anthony+Mair+R1.jpg" && echo "  ✓ cheapshot-02.jpg" || echo "  ✗ cheapshot-02.jpg FAILED"
curl -sL -o "$BASE_DIR/cheapshot/cheapshot-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1651596473494-8LDMQZV9ZW0ULVGQ3X69/Cheapshot+Interior+3+-+Anthony+Mair+R1.jpg" && echo "  ✓ cheapshot-03.jpg" || echo "  ✗ cheapshot-03.jpg FAILED"
curl -sL -o "$BASE_DIR/cheapshot/cheapshot-04.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1651596478076-R6XN8UPYV1H71X3FGGE8/Cheapshot+Interior+6+-+Anthony+Mair+R1.jpg" && echo "  ✓ cheapshot-04.jpg" || echo "  ✗ cheapshot-04.jpg FAILED"

# La Mona Rosa (3 photos)
mkdir -p "$BASE_DIR/la-mona-rosa"
curl -sL -o "$BASE_DIR/la-mona-rosa/la-mona-rosa-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1689616004242-W74554SWL3GUO6P2U87B/LMR+Architecture+19+-+Anthony+Mair.jpg" && echo "  ✓ la-mona-rosa-01.jpg" || echo "  ✗ la-mona-rosa-01.jpg FAILED"
curl -sL -o "$BASE_DIR/la-mona-rosa/la-mona-rosa-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1689616005723-VTH5EQQV0GHBTYQBZRIJ/LMR+Architecture+20+-+Anthony+Mair.jpg" && echo "  ✓ la-mona-rosa-02.jpg" || echo "  ✗ la-mona-rosa-02.jpg FAILED"
curl -sL -o "$BASE_DIR/la-mona-rosa/la-mona-rosa-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1689616000917-TT9SK72RPSGZNCLKHK1U/LMR+Architecture+12+-+Anthony+Mair.jpg" && echo "  ✓ la-mona-rosa-03.jpg" || echo "  ✗ la-mona-rosa-03.jpg FAILED"

# Discopussy (3 photos)
mkdir -p "$BASE_DIR/discopussy"
curl -sL -o "$BASE_DIR/discopussy/discopussy-01.jpeg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/a05811d6-5728-4d94-9ca9-619e0636da6e/Extras-BrightLightDA-08.jpeg" && echo "  ✓ discopussy-01.jpeg" || echo "  ✗ discopussy-01.jpeg FAILED"
curl -sL -o "$BASE_DIR/discopussy/discopussy-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741801152-GI2WQTTCFNJMQ2MPJWUP/Discopussy+-+Anthony+Mair+-+04.jpg" && echo "  ✓ discopussy-02.jpg" || echo "  ✗ discopussy-02.jpg FAILED"
curl -sL -o "$BASE_DIR/discopussy/discopussy-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741804506-60PA0Y8ZT9HZYQHIFLSY/Discopussy+-+Anthony+Mair+-+09.jpg" && echo "  ✓ discopussy-03.jpg" || echo "  ✗ discopussy-03.jpg FAILED"

# Lucky Day (3 photos)
mkdir -p "$BASE_DIR/lucky-day"
curl -sL -o "$BASE_DIR/lucky-day/lucky-day-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741656263-7F7D7NLPWT01LCSHQWJ7/Lucky+Day+-+Anthony+Mair+-+03.jpg" && echo "  ✓ lucky-day-01.jpg" || echo "  ✗ lucky-day-01.jpg FAILED"
curl -sL -o "$BASE_DIR/lucky-day/lucky-day-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741659007-AMUV1MCTBVQ8LPKQAOHZ/Lucky+Day+-+Anthony+Mair+-+06.jpg" && echo "  ✓ lucky-day-02.jpg" || echo "  ✗ lucky-day-02.jpg FAILED"
curl -sL -o "$BASE_DIR/lucky-day/lucky-day-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741660903-HXRWX3M2MYN9IN38NXGX/Lucky+Day+-+Anthony+Mair+-+08.jpg" && echo "  ✓ lucky-day-03.jpg" || echo "  ✗ lucky-day-03.jpg FAILED"

# The Laundry Room (3 photos)
mkdir -p "$BASE_DIR/laundry-room"
curl -sL -o "$BASE_DIR/laundry-room/laundry-room-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741733073-BFCQM18KZSPJKWKZCYEG/Laundry+Room+-+Anthony+Mair+-+02.jpg" && echo "  ✓ laundry-room-01.jpg" || echo "  ✗ laundry-room-01.jpg FAILED"
curl -sL -o "$BASE_DIR/laundry-room/laundry-room-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741735432-B6NUW7OSGMV3LYYQZ09B/Laundry+Room+-+Anthony+Mair+-+04.jpg" && echo "  ✓ laundry-room-02.jpg" || echo "  ✗ laundry-room-02.jpg FAILED"
curl -sL -o "$BASE_DIR/laundry-room/laundry-room-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e1e2688f7069705dae28139/1590741737513-9BY2QXSQKRG0GGQPV6TQ/Laundry+Room+-+Anthony+Mair+-+06.jpg" && echo "  ✓ laundry-room-03.jpg" || echo "  ✗ laundry-room-03.jpg FAILED"

# Park On Fremont (5 photos)
mkdir -p "$BASE_DIR/park-on-fremont"
curl -sL -o "$BASE_DIR/park-on-fremont/park-on-fremont-01.jpg" "https://images.squarespace-cdn.com/content/v1/5e8b9fa0db0f0c5f7fb6a4cd/e62a0309-0e1a-4cfe-899b-0f081ee617f6/Park+Architecture-++Anthony+Mair-19.jpg" && echo "  ✓ park-on-fremont-01.jpg" || echo "  ✗ park-on-fremont-01.jpg FAILED"
curl -sL -o "$BASE_DIR/park-on-fremont/park-on-fremont-02.jpg" "https://images.squarespace-cdn.com/content/v1/5e8b9fa0db0f0c5f7fb6a4cd/411adc8a-da05-4d1a-a7a7-79e7c51cbe1b/Park+Architecture-++Anthony+Mair-42.jpg" && echo "  ✓ park-on-fremont-02.jpg" || echo "  ✗ park-on-fremont-02.jpg FAILED"
curl -sL -o "$BASE_DIR/park-on-fremont/park-on-fremont-03.jpg" "https://images.squarespace-cdn.com/content/v1/5e8b9fa0db0f0c5f7fb6a4cd/690eee7a-7e7e-475a-9437-f30f254370e8/Park+Architecture-++Anthony+Mair-37.jpg" && echo "  ✓ park-on-fremont-03.jpg" || echo "  ✗ park-on-fremont-03.jpg FAILED"
curl -sL -o "$BASE_DIR/park-on-fremont/park-on-fremont-04.jpg" "https://images.squarespace-cdn.com/content/v1/5e8b9fa0db0f0c5f7fb6a4cd/130338c4-5623-4974-bc8e-800e3e519920/Berry+Fresh+Salad.jpg" && echo "  ✓ park-on-fremont-04.jpg" || echo "  ✗ park-on-fremont-04.jpg FAILED"
curl -sL -o "$BASE_DIR/park-on-fremont/park-on-fremont-05.jpg" "https://images.squarespace-cdn.com/content/v1/5e8b9fa0db0f0c5f7fb6a4cd/80b91e92-6c4f-4573-a7de-8c95bcc66854/Lemonade+Stand.jpg" && echo "  ✓ park-on-fremont-05.jpg" || echo "  ✗ park-on-fremont-05.jpg FAILED"

# Eureka! Discover American Craft (1 photos)
mkdir -p "$BASE_DIR/eureka"
curl -sL -o "$BASE_DIR/eureka/eureka-01.jpg" "https://images.prismic.io/eureka-restaurants/fc456ae6-0454-4bfc-991d-85a7c214f429_eureka%21_architectural_las_vegas_2018_02-19.jpg" && echo "  ✓ eureka-01.jpg" || echo "  ✗ eureka-01.jpg FAILED"

# Corduroy (7 photos)
mkdir -p "$BASE_DIR/corduroy"
curl -sL -o "$BASE_DIR/corduroy/corduroy-01.jpg" "https://corduroylv.com/wp-content/uploads/2017/07/DSC00328.jpg" && echo "  ✓ corduroy-01.jpg" || echo "  ✗ corduroy-01.jpg FAILED"
curl -sL -o "$BASE_DIR/corduroy/corduroy-02.jpg" "https://corduroylv.com/wp-content/uploads/2017/07/DSC00464.jpg" && echo "  ✓ corduroy-02.jpg" || echo "  ✗ corduroy-02.jpg FAILED"
curl -sL -o "$BASE_DIR/corduroy/corduroy-03.jpg" "https://corduroylv.com/wp-content/uploads/2017/07/Curduroy-09.jpg" && echo "  ✓ corduroy-03.jpg" || echo "  ✗ corduroy-03.jpg FAILED"
curl -sL -o "$BASE_DIR/corduroy/corduroy-04.jpg" "https://corduroylv.com/wp-content/uploads/2017/07/Curduroy-20.jpg" && echo "  ✓ corduroy-04.jpg" || echo "  ✗ corduroy-04.jpg FAILED"
curl -sL -o "$BASE_DIR/corduroy/corduroy-05.jpg" "https://corduroylv.com/wp-content/uploads/2017/07/Curduroy-28.jpg" && echo "  ✓ corduroy-05.jpg" || echo "  ✗ corduroy-05.jpg FAILED"
curl -sL -o "$BASE_DIR/corduroy/corduroy-06.jpg" "https://corduroylv.com/wp-content/uploads/2017/07/Curduroy-11.jpg" && echo "  ✓ corduroy-06.jpg" || echo "  ✗ corduroy-06.jpg FAILED"
curl -sL -o "$BASE_DIR/corduroy/corduroy-07.jpg" "https://corduroylv.com/wp-content/uploads/2017/07/header-home.jpg" && echo "  ✓ corduroy-07.jpg" || echo "  ✗ corduroy-07.jpg FAILED"

# Le Thai (4 photos)
mkdir -p "$BASE_DIR/le-thai"
curl -sL -o "$BASE_DIR/le-thai/le-thai-01.jpg" "https://lethaivegas.com/wp-content/uploads/2020/06/le_thai_sign_day_by_cierra_pedro_2_750x750.jpg" && echo "  ✓ le-thai-01.jpg" || echo "  ✗ le-thai-01.jpg FAILED"
curl -sL -o "$BASE_DIR/le-thai/le-thai-02.jpg" "https://lethaivegas.com/wp-content/uploads/2020/06/le_thai_interiors_by_cierra_pedro_2.jpg" && echo "  ✓ le-thai-02.jpg" || echo "  ✗ le-thai-02.jpg FAILED"
curl -sL -o "$BASE_DIR/le-thai/le-thai-03.jpg" "https://lethaivegas.com/wp-content/uploads/2020/06/le_thai_2_interiors_by_cierra_pedro_2.jpg" && echo "  ✓ le-thai-03.jpg" || echo "  ✗ le-thai-03.jpg FAILED"
curl -sL -o "$BASE_DIR/le-thai/le-thai-04.jpg" "https://lethaivegas.com/wp-content/uploads/2020/06/le_thai_awesome_noodles_15_1310x1287.jpg" && echo "  ✓ le-thai-04.jpg" || echo "  ✗ le-thai-04.jpg FAILED"

# Istanbul Mediterranean (5 photos)
mkdir -p "$BASE_DIR/istanbul-mediterranean"
curl -sL -o "$BASE_DIR/istanbul-mediterranean/istanbul-mediterranean-01.jpg" "https://www.istanbullv.com/images/fremont/0ca2645f-d176-48f6-bce4-f582566d8db0.JPG" && echo "  ✓ istanbul-mediterranean-01.jpg" || echo "  ✗ istanbul-mediterranean-01.jpg FAILED"
curl -sL -o "$BASE_DIR/istanbul-mediterranean/istanbul-mediterranean-02.jpg" "https://www.istanbullv.com/images/opening/06c92965-511f-478e-a59a-b824f1dbcbe9.JPG" && echo "  ✓ istanbul-mediterranean-02.jpg" || echo "  ✗ istanbul-mediterranean-02.jpg FAILED"
curl -sL -o "$BASE_DIR/istanbul-mediterranean/istanbul-mediterranean-03.jpg" "https://www.istanbullv.com/images/opening/2bd0c493-3509-4062-ac37-7b1b758333f5.JPG" && echo "  ✓ istanbul-mediterranean-03.jpg" || echo "  ✗ istanbul-mediterranean-03.jpg FAILED"
curl -sL -o "$BASE_DIR/istanbul-mediterranean/istanbul-mediterranean-04.jpg" "https://www.istanbullv.com/images/opening/3c76e5b6-1673-48b3-b522-5ebc9e9af4cc.JPG" && echo "  ✓ istanbul-mediterranean-04.jpg" || echo "  ✗ istanbul-mediterranean-04.jpg FAILED"
curl -sL -o "$BASE_DIR/istanbul-mediterranean/istanbul-mediterranean-05.jpg" "https://www.istanbullv.com/images/opening/46256f64-401e-4ce2-a956-9fa8b6ae24f3.JPG" && echo "  ✓ istanbul-mediterranean-05.jpg" || echo "  ✗ istanbul-mediterranean-05.jpg FAILED"

# Taco Escobar (2 photos)
mkdir -p "$BASE_DIR/taco-escobar"
curl -sL -o "$BASE_DIR/taco-escobar/taco-escobar-01.jpg" "https://images.getbento.com/accounts/0929cfcfbe4869ee19f6b5a81a58876f/media/images/1987925.7.22_taco_re-edits_taco_re-edits-2.jpg" && echo "  ✓ taco-escobar-01.jpg" || echo "  ✗ taco-escobar-01.jpg FAILED"
curl -sL -o "$BASE_DIR/taco-escobar/taco-escobar-02.png" "https://images.getbento.com/accounts/0929cfcfbe4869ee19f6b5a81a58876f/media/images/7356915683Taco_Escobar_mask_wall.png" && echo "  ✓ taco-escobar-02.png" || echo "  ✗ taco-escobar-02.png FAILED"

# Evel Pie (2 photos)
mkdir -p "$BASE_DIR/evel-pie"
curl -sL -o "$BASE_DIR/evel-pie/evel-pie-01.jpg" "https://images.getbento.com/accounts/3cb0f498f4129b39ae4106c0f8157564/media/oZYBsH6mTy6hBVIr8Cvj_313355608_1785695115136099_7908754783037573421_n.jpg" && echo "  ✓ evel-pie-01.jpg" || echo "  ✗ evel-pie-01.jpg FAILED"
curl -sL -o "$BASE_DIR/evel-pie/evel-pie-02.jpg" "https://images.getbento.com/accounts/3cb0f498f4129b39ae4106c0f8157564/media/1ncx4kiRmeRAPm6GQJJx_313886177_1785695105136100_4227518288133543375_n.jpg" && echo "  ✓ evel-pie-02.jpg" || echo "  ✗ evel-pie-02.jpg FAILED"

# Electric Mushroom (6 photos)
mkdir -p "$BASE_DIR/electric-mushroom"
curl -sL -o "$BASE_DIR/electric-mushroom/electric-mushroom-01.jpg" "https://www.electricmushroom.com/wp-content/uploads/2025/12/589139131_18544798405004420_2054965668287855631_n-600x400.jpg" && echo "  ✓ electric-mushroom-01.jpg" || echo "  ✗ electric-mushroom-01.jpg FAILED"
curl -sL -o "$BASE_DIR/electric-mushroom/electric-mushroom-02.jpg" "https://www.electricmushroom.com/wp-content/uploads/2025/12/573602868_17875307607432326_281005875837732677_n-600x400.jpg" && echo "  ✓ electric-mushroom-02.jpg" || echo "  ✗ electric-mushroom-02.jpg FAILED"
curl -sL -o "$BASE_DIR/electric-mushroom/electric-mushroom-03.jpg" "https://www.electricmushroom.com/wp-content/uploads/2025/12/561646670_18533953201004420_5995495228034222007_n-600x400.jpg" && echo "  ✓ electric-mushroom-03.jpg" || echo "  ✗ electric-mushroom-03.jpg FAILED"
curl -sL -o "$BASE_DIR/electric-mushroom/electric-mushroom-04.jpg" "https://www.electricmushroom.com/wp-content/uploads/2025/12/565039416_18533953213004420_6243401411542944161_n-600x400.jpg" && echo "  ✓ electric-mushroom-04.jpg" || echo "  ✗ electric-mushroom-04.jpg FAILED"
curl -sL -o "$BASE_DIR/electric-mushroom/electric-mushroom-05.jpg" "https://www.electricmushroom.com/wp-content/uploads/2025/12/564067203_18533953222004420_6540528674909964076_n-600x400.jpg" && echo "  ✓ electric-mushroom-05.jpg" || echo "  ✗ electric-mushroom-05.jpg FAILED"
curl -sL -o "$BASE_DIR/electric-mushroom/electric-mushroom-06.jpg" "https://www.electricmushroom.com/wp-content/uploads/2025/12/547731179_17859527850485647_997542151245627121_n-600x400.jpg" && echo "  ✓ electric-mushroom-06.jpg" || echo "  ✗ electric-mushroom-06.jpg FAILED"

echo "\nDone! Downloaded 69 photos into $BASE_DIR/"