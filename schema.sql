CREATE TYPE user_role AS ENUM ('donor', 'farmer', 'planter', 'admin', 'caretaker');
CREATE TYPE tree_status AS ENUM ('in_nursery', 'ready_for_planting', 'planted', 'established', 'producing', 'dead', 'replaced');
CREATE TYPE health_status AS ENUM ('healthy', 'poor', 'critical', 'under_treatment', 'replaced');
CREATE TYPE donation_type AS ENUM ('one_time', 'subscription', 'gift', 'memorial', 'corporate');
CREATE TYPE payment_method AS ENUM ('credit_card', 'paypal', 'bank_transfer');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE subscription_plan AS ENUM ('basic_9_90', 'standard_19_90', 'premium_29_90');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'past_due');
CREATE TYPE training_attendance_status AS ENUM ('registered', 'attended', 'cancelled');
CREATE TYPE replacement_status AS ENUM ('reported', 'verified', 'approved', 'completed', 'rejected');
CREATE TYPE notification_type AS ENUM ('email', 'sms', 'in_app');
CREATE TYPE certificate_type AS ENUM ('planting', 'gift', 'subscription');

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    registration_date TIMESTAMPTZ DEFAULT NOW(),
    user_role user_role NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    profile_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE donors (
    donor_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    is_anonymous BOOLEAN DEFAULT FALSE,
    preferred_name TEXT,
    company_name TEXT,
    is_corporate BOOLEAN DEFAULT FALSE,
    total_donated DECIMAL(10,2) DEFAULT 0,
    trees_planted INT DEFAULT 0,
    tax_id TEXT,
    billing_address TEXT,
    preferences JSONB
);

CREATE TABLE farmers (
    farmer_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    land_parcel_id TEXT,
    land_size_hectares DECIMAL(6,2),
    village TEXT,
    district TEXT,
    region TEXT,
    country TEXT,
    joined_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    bank_account TEXT,
    government_id TEXT
);

CREATE TABLE planters (
    planter_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    employee_id TEXT UNIQUE,
    hire_date DATE,
    supervisor TEXT,
    certified_species TEXT[],
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE caretakers (
    caretaker_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    assigned_date DATE,
    trees_assigned INT DEFAULT 0,
    region TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE admins (
    admin_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    admin_level TEXT NOT NULL,
    department TEXT,
    permissions TEXT[],
    last_login TIMESTAMPTZ
);

CREATE TABLE species (
    species_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    common_name TEXT UNIQUE NOT NULL,
    scientific_name TEXT UNIQUE NOT NULL,
    native_region TEXT,
    growth_rate DECIMAL(3,2), -- meters per year approx
    max_height DECIMAL(5,2),
    co2_absorption_rate DECIMAL(5,2), -- kg per year
    is_fruit_tree BOOLEAN DEFAULT FALSE,
    care_instructions TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE badges (
    badge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    qr_code TEXT UNIQUE NOT NULL,
    rfid_tag TEXT UNIQUE,
    nursing_start_date DATE,
    planting_date DATE,
    nursery_name TEXT,
    health_status health_status DEFAULT 'healthy',
    is_assigned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE trees (
    tree_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_id UUID REFERENCES badges(badge_id) ON DELETE SET NULL,
    species_id UUID NOT NULL REFERENCES species(species_id) ON DELETE RESTRICT,
    donor_id UUID REFERENCES donors(donor_id) ON DELETE SET NULL,
    farmer_id UUID REFERENCES farmers(farmer_id) ON DELETE SET NULL,
    planter_id UUID REFERENCES planters(planter_id) ON DELETE SET NULL,
    caretaker_id UUID REFERENCES caretakers(caretaker_id) ON DELETE SET NULL,
    planted_date DATE,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    status tree_status DEFAULT 'in_nursery',
    last_check_date DATE,
    height_meters DECIMAL(5,2),
    diameter_cm DECIMAL(5,2),
    health_status health_status DEFAULT 'healthy',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tree_status_history (
    history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tree_id UUID NOT NULL REFERENCES trees(tree_id) ON DELETE CASCADE,
    previous_status tree_status,
    new_status tree_status NOT NULL,
    changed_date TIMESTAMPTZ DEFAULT NOW(),
    changed_by TEXT, -- user email or ID
    reason TEXT,
    notes TEXT
);

CREATE TABLE geolocations (
    location_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tree_id UUID NOT NULL REFERENCES trees(tree_id) ON DELETE CASCADE,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    altitude DECIMAL(7,2),
    address TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    accuracy TEXT,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tree_photos (
    photo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tree_id UUID NOT NULL REFERENCES trees(tree_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    taken_date DATE,
    taken_by TEXT,
    caption TEXT,
    is_public BOOLEAN DEFAULT TRUE
);

CREATE TABLE subscriptions (
    subscription_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES donors(donor_id) ON DELETE CASCADE,
    plan_type subscription_plan NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    next_billing_date DATE,
    status subscription_status DEFAULT 'active',
    trees_allocated_this_year INT DEFAULT 0,
    trees_planted_this_year INT DEFAULT 0,
    monthly_fee DECIMAL(6,2) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE plan_benefits (
    benefit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_type subscription_plan UNIQUE NOT NULL,
    trees_per_year INT NOT NULL,
    monthly_fee DECIMAL(6,2) NOT NULL,
    tons_co2 INT,
    countries INT,
    states INT,
    limited_editions INT,
    exclusive_species INT,
    description TEXT
);

CREATE TABLE donations (
    donation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES donors(donor_id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(subscription_id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    donation_date DATE NOT NULL,
    donation_type donation_type NOT NULL,
    payment_method payment_method NOT NULL,
    transaction_id TEXT,
    status payment_status DEFAULT 'pending',
    is_gift BOOLEAN DEFAULT FALSE,
    gift_recipient TEXT,
    gift_message TEXT,
    gift_delivery_date DATE,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
    payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID REFERENCES donations(donation_id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(subscription_id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    payment_method payment_method NOT NULL,
    transaction_id TEXT,
    status payment_status DEFAULT 'pending',
    invoice_number TEXT UNIQUE,
    receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invoices (
    invoice_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES payments(payment_id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE,
    amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    pdf_url TEXT,
    is_paid BOOLEAN DEFAULT FALSE
);

CREATE TABLE certificates (
    certificate_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES donors(donor_id) ON DELETE CASCADE,
    donation_id UUID REFERENCES donations(donation_id) ON DELETE SET NULL,
    tree_id UUID REFERENCES trees(tree_id) ON DELETE SET NULL,
    certificate_number TEXT UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    certificate_type certificate_type NOT NULL,
    pdf_url TEXT,
    image_url TEXT,
    is_downloaded BOOLEAN DEFAULT FALSE,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE training_sessions (
    training_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    training_date DATE NOT NULL,
    location TEXT,
    trainer_name TEXT,
    duration_hours INT,
    topics TEXT[],
    max_participants INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE training_attendance (
    attendance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    training_id UUID NOT NULL REFERENCES training_sessions(training_id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    attendance_date DATE,
    status training_attendance_status DEFAULT 'registered',
    certificate_url TEXT,
    score INT,
    feedback TEXT,
    UNIQUE(training_id, farmer_id)
);

CREATE TABLE tree_replacements (
    replacement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_tree_id UUID NOT NULL REFERENCES trees(tree_id) ON DELETE CASCADE,
    new_tree_id UUID REFERENCES trees(tree_id) ON DELETE SET NULL,
    death_reported_date DATE NOT NULL,
    verification_date DATE,
    replacement_date DATE,
    death_reason TEXT,
    verified_by TEXT,
    approved_by TEXT,
    notes TEXT,
    status replacement_status DEFAULT 'reported'
);

CREATE TABLE harvest_records (
    harvest_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tree_id UUID NOT NULL REFERENCES trees(tree_id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    harvest_date DATE NOT NULL,
    quantity_kg DECIMAL(10,2),
    product_type TEXT,
    income_amount DECIMAL(10,2),
    buyer_name TEXT,
    notes TEXT
);

CREATE TABLE public_registry (
    registry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tree_id UUID UNIQUE NOT NULL REFERENCES trees(tree_id) ON DELETE CASCADE,
    publication_date TIMESTAMPTZ DEFAULT NOW(),
    show_donor_name BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    last_viewed TIMESTAMPTZ
);

CREATE TABLE blog_posts (
    post_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    publish_date DATE,
    image_url TEXT,
    tags TEXT[],
    view_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE impact_stats (
    stat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recorded_date DATE UNIQUE NOT NULL,
    total_trees INT NOT NULL,
    total_donors INT NOT NULL,
    total_farmers INT NOT NULL,
    total_co2_tons DECIMAL(10,2),
    countries_reached INT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    notification_type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    sent_date TIMESTAMPTZ DEFAULT NOW(),
    read_date TIMESTAMPTZ,
    action_url TEXT
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(user_role);

CREATE INDEX idx_trees_status ON trees(status);
CREATE INDEX idx_trees_species ON trees(species_id);
CREATE INDEX idx_trees_farmer ON trees(farmer_id);
CREATE INDEX idx_trees_donor ON trees(donor_id);
CREATE INDEX idx_trees_location ON trees USING GIST (point(latitude, longitude)); -- PostGIS recommended

CREATE INDEX idx_donations_donor ON donations(donor_id);
CREATE INDEX idx_donations_date ON donations(donation_date);
CREATE INDEX idx_donations_status ON donations(status);

CREATE INDEX idx_subscriptions_donor ON subscriptions(donor_id);
CREATE INDEX idx_subscriptions_next_billing ON subscriptions(next_billing_date) WHERE status = 'active';

CREATE INDEX idx_training_date ON training_sessions(training_date);
CREATE INDEX idx_attendance_farmer ON training_attendance(farmer_id);

CREATE INDEX idx_replacements_status ON tree_replacements(status);

CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

CREATE VIEW donor_impact AS
SELECT 
    d.donor_id,
    u.first_name || ' ' || u.last_name AS donor_name,
    d.total_donated,
    d.trees_planted,
    COUNT(t.tree_id) AS current_trees,
    COALESCE(SUM(s.monthly_fee), 0) AS monthly_subscription_value
FROM donors d
JOIN users u ON d.donor_id = u.user_id
LEFT JOIN trees t ON d.donor_id = t.donor_id AND t.status IN ('planted', 'established', 'producing')
LEFT JOIN subscriptions s ON d.donor_id = s.donor_id AND s.status = 'active'
GROUP BY d.donor_id, u.first_name, u.last_name, d.total_donated, d.trees_planted;

CREATE VIEW farmer_summary AS
SELECT 
    f.farmer_id,
    u.first_name || ' ' || u.last_name AS farmer_name,
    f.country,
    f.region,
    COUNT(t.tree_id) AS total_trees,
    COUNT(CASE WHEN t.status = 'dead' THEN 1 END) AS dead_trees,
    COUNT(DISTINCT ta.training_id) AS trainings_attended,
    COALESCE(SUM(h.income_amount), 0) AS total_harvest_income
FROM farmers f
JOIN users u ON f.farmer_id = u.user_id
LEFT JOIN trees t ON f.farmer_id = t.farmer_id
LEFT JOIN training_attendance ta ON f.farmer_id = ta.farmer_id AND ta.status = 'attended'
LEFT JOIN harvest_records h ON f.farmer_id = h.farmer_id
GROUP BY f.farmer_id, u.first_name, u.last_name, f.country, f.region;

CREATE VIEW tree_details_public AS
SELECT 
    t.tree_id,
    s.common_name AS species,
    t.latitude,
    t.longitude,
    t.planted_date,
    CASE WHEN pr.show_donor_name = TRUE THEN d.preferred_name ELSE 'Anonymous' END AS donor_name
FROM trees t
JOIN species s ON t.species_id = s.species_id
LEFT JOIN donors d ON t.donor_id = d.donor_id
LEFT JOIN public_registry pr ON t.tree_id = pr.tree_id
WHERE t.status != 'dead'; -- optionally exclude dead trees

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_trees BEFORE UPDATE ON trees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_subscriptions BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_blog_posts BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert a donor
INSERT INTO users (email, password_hash, first_name, last_name, user_role) VALUES ('john@example.com', 'hashed_pw', 'John', 'Doe', 'donor');
INSERT INTO donors (donor_id, is_anonymous) VALUES ((SELECT user_id FROM users WHERE email='john@example.com'), FALSE);

-- Insert a farmer
INSERT INTO users (email, password_hash, first_name, last_name, user_role) VALUES ('maria@example.com', 'hashed_pw', 'Maria', 'Santos', 'farmer');
INSERT INTO farmers (farmer_id, land_size_hectares, village, district, country, joined_date) 
VALUES ((SELECT user_id FROM users WHERE email='maria@example.com'), 3.5, 'Davao', 'Davao', 'Philippines', '2024-03-15');

-- Insert a species
INSERT INTO species (common_name, scientific_name, co2_absorption_rate) VALUES ('Oak', 'Quercus robur', 25);

-- Insert a badge
INSERT INTO badges (qr_code, nursing_start_date) VALUES ('QR12345', '2026-01-15');

-- Insert a tree
INSERT INTO trees (badge_id, species_id, farmer_id, planted_date, latitude, longitude, status) 
VALUES (
    (SELECT badge_id FROM badges WHERE qr_code='QR12345'),
    (SELECT species_id FROM species WHERE common_name='Oak'),
    (SELECT farmer_id FROM farmers WHERE farmer_id=(SELECT user_id FROM users WHERE email='maria@example.com')),
    '2026-02-15', -1.2921, 36.8219, 'planted'
);

