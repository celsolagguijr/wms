
# step 1. create a new database.
CREATE DATABASE wms;

# step 2. use the created database.
USE wms;

# step 3. create a table named `picking_slips`
CREATE TABLE picking_slips(
 id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 order_id BIGINT(20) NOT NULL,
 order_fullfillment_order_id BIGINT(20) NOT NULL,
 is_contained_single_product TINYINT(1) NOT NULL,
 created_at TIMESTAMP NOT NULL
);

# step 4. create a table named `picking_slip_dates` .
CREATE TABLE picking_slip_dates(
 id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 picking_slip_id BIGINT(20) NOT NULL,
 printed_username VARCHAR(20),
 inspected_username VARCHAR(20),
 packed_username VARCHAR(20),
 shipped_username VARCHAR(20),
 held_username VARCHAR(20),
 cancelled_username VARCHAR(20),
 refunded_username VARCHAR(20),
 confirmed_username VARCHAR(20),
 printed_at TIMESTAMP NULL,
 inspected_at TIMESTAMP NULL,
 packed_at TIMESTAMP NULL,
 shipped_at TIMESTAMP NULL,
 delivered_at TIMESTAMP NULL,
 returned_at TIMESTAMP NULL,
 cancelled_at TIMESTAMP NULL,
 refunded_at TIMESTAMP NULL,
 confirmed_at TIMESTAMP NULL,
 held_at TIMESTAMP NULL,
 held_reason VARCHAR(20)
);

# step 5. create a table named `picking_slip_items` .
CREATE TABLE picking_slip_items(
 id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 picking_slip_id BIGINT(20) NOT NULL,
 item_id BIGINT(20) NOT NULL,
 stock_id BIGINT(20) NOT NULL,
 order_fulfillment_product_id BIGINT(20) NOT NULL,
 quantity INT(11) NOT NULL,
 refunded_quantity INT(11) NOT NULL,
 location_id INT(11) NOT NULL,
 location_code VARCHAR(30) NOT NULL,
 is_pre_order TINYINT(1) NOT NULL,
 is_sales_only TINYINT(1) NOT NULL,
 pre_order_shipping_at TIMESTAMP NULL,
 pre_order_deadline_at TIMESTAMP NULL,
 created_at TIMESTAMP NULL,
 updated_at TIMESTAMP NULL
);

# step 6. create one to one relationship of picking_slips and picking_slip_dates
ALTER TABLE picking_slip_dates
ADD CONSTRAINT fk_picking_slip_dates_picking_slip_id 
FOREIGN KEY (picking_slip_id)
REFERENCES picking_slips(id)

# step 7. make picking_slip_id unique
ALTER TABLE picking_slip_dates
ADD CONSTRAINT unique_picking_slip_id UNIQUE (picking_slip_id)

# step 8. create many to one relationship of picking_slip_items and picking_slips
ALTER TABLE picking_slip_items
ADD CONSTRAINT fk_picking_slip_items_picking_slip_id 
FOREIGN KEY (picking_slip_id)
REFERENCES picking_slips(id)



