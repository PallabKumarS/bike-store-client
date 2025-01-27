import { Card, Row, Col, Typography, Carousel, Button } from "antd";
import { TeamOutlined, ToolOutlined, RocketOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import img1 from "@/assets/workshop 1.jpg";
import img2 from "@/assets/workshop 2.jpg";
import img3 from "@/assets/workshop 3.webp";
import img4 from "@/assets/workshop 4.jpg";

const { Title, Paragraph } = Typography;

const About = () => {
  const breadcrumbItems = [
    {
      title: (
        <NavLink to="/">
          <HomeOutlined /> Home
        </NavLink>
      ),
    },
    {
      title: <NavLink to="/about">About</NavLink>,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* breadcrumb here  */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Breadcrumb items={breadcrumbItems} />
      </motion.div>

      {/* Dynamic Hero Section with Parallax Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[60vh] mb-16"
      >
        <img
          src={img4}
          alt="Hero Workshop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Crafting Your Perfect Ride
            </motion.h1>
            <p className="text-xl md:text-2xl">
              Where Passion Meets Performance
            </p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Workshop Showcase */}
      <Row gutter={[16, 16]} className="mb-16">
        <Col xs={24} lg={12}>
          <Carousel
            autoplay
            effect="fade"
            className="rounded-lg overflow-hidden"
          >
            <div>
              <img
                src={img1}
                alt="Custom Build"
                className="h-[400px] w-full object-cover"
              />
            </div>
            <div>
              <img
                src={img2}
                alt="Repair Bay"
                className="h-[400px] w-full object-cover"
              />
            </div>
            <div>
              <img
                src={img3}
                alt="Paint Shop"
                className="h-[400px] w-full object-cover"
              />
            </div>
          </Carousel>
        </Col>
        <Col xs={24} lg={12}>
          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col justify-center p-8"
          >
            <Title level={2}>Our Workshop Magic</Title>
            <Paragraph className="text-lg">
              Step into our state-of-the-art workshop where every bike tells a
              story. Our master craftsmen combine traditional techniques with
              cutting-edge technology to create, restore, and customize bikes
              that are truly one of a kind.
            </Paragraph>
          </motion.div>
        </Col>
      </Row>
      {/* Interactive Experience Cards */}
      <div className="mb-16">
        <Title level={2} className="text-center mb-8">
          The BikeStore Experience
        </Title>
        <Row gutter={[16, 16]}>
          {[
            {
              icon: <TeamOutlined className="text-5xl" />,
              title: "Virtual Bike Fitting",
              description: "3D body scanning technology for perfect bike fit",
              color: "from-blue-400 to-purple-500",
            },
            {
              icon: <ToolOutlined className="text-5xl" />,
              title: "Custom Build Lab",
              description: "Design your dream bike in our virtual lab",
              color: "from-green-400 to-blue-500",
            },
            {
              icon: <RocketOutlined className="text-5xl" />,
              title: "Test Track Access",
              description: "Try before you buy on our indoor test track",
              color: "from-purple-400 to-pink-500",
            },
          ].map((item, index) => (
            <Col xs={24} md={8} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`h-full bg-gradient-to-r ${item.color} text-white hover:shadow-xl transition-all`}
                  bordered={false}
                >
                  {item.icon}
                  <Title level={3} className="text-white mt-4">
                    {item.title}
                  </Title>
                  <Paragraph className="text-white/90">
                    {item.description}
                  </Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
      {/* Interactive Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-black text-white p-12 rounded-lg mb-16"
      >
        <Row gutter={[16, 16]} className="text-center">
          <Col xs={12} md={6}>
            <motion.div
              whileInView={{ scale: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold">1000+</div>
              <div>Custom Builds</div>
            </motion.div>
          </Col>
          <Col xs={12} md={6}>
            <motion.div
              whileInView={{ scale: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold">15+</div>
              <div>Master Technicians</div>
            </motion.div>
          </Col>
          <Col xs={12} md={6}>
            <motion.div
              whileInView={{ scale: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl font-bold">24/7</div>
              <div>Online Support</div>
            </motion.div>
          </Col>
          <Col xs={12} md={6}>
            <motion.div
              whileInView={{ scale: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-4xl font-bold">98%</div>
              <div>Happy Riders</div>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Animated Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16"
      >
        <Row
          gutter={[32, 32]}
          className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-12 rounded-2xl text-white"
        >
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Title level={2} className="text-white mb-8">
                Experience BikeStore In Person
              </Title>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-4xl">🏪</div>
                  <div>
                    <h3 className="text-xl font-bold">Flagship Store</h3>
                    <p>123 Cycling Avenue, Bike District</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-4xl">🛠️</div>
                  <div>
                    <h3 className="text-xl font-bold">Service Workshop</h3>
                    <p>Premium Repair & Customization Center</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="text-xl font-bold">Test Track</h3>
                    <p>Try Before You Buy Experience</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <motion.div
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <Title level={2} className="text-white mb-8">
                  Opening Hours
                </Title>
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-4">
                  {[
                    {
                      day: "Weekdays",
                      hours: "9:00 AM - 8:00 PM",
                      status: "Full Service",
                    },
                    {
                      day: "Saturday",
                      hours: "10:00 AM - 6:00 PM",
                      status: "Full Service",
                    },
                    {
                      day: "Sunday",
                      hours: "11:00 AM - 5:00 PM",
                      status: "Test Rides Only",
                    },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                    >
                      <h3 className="text-xl font-bold">{schedule.day}</h3>
                      <p>{schedule.hours}</p>
                      <span className="text-sm text-blue-300">
                        {schedule.status}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-8 bg-blue-600 p-6 rounded-lg text-center"
              >
                <h3 className="text-2xl font-bold mb-2">Book a Test Ride</h3>
                <p className="mb-4">Experience your dream bike today</p>
                <Button
                  type="primary"
                  size="large"
                  className="bg-white text-blue-900 hover:bg-blue-100"
                >
                  Schedule Now
                </Button>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default About;
