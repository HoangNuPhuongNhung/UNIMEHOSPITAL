import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image,ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { useNavigation } from '@react-navigation/native';

const appointments = [
    { id: 1, title: 'Tâm lý', place: 'Phòng khám Saigon', date: '25 Sep', time: '10:30am', icon: 'account' },
    { id: 2, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
    { id: 3, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
    { id: 4, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
  ];
  
  const HomePage = () => {
    const { userInfo } = useContext(UserContext);
    const [greeting, setGreeting] = useState('');
    const [rssArticles, setRssArticles] = useState([]);
    const [visibleItems, setVisibleItems] = useState(5);
    const navigation = useNavigation();
    const listRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const scrollTimeoutRef = useRef(null);
  
    useEffect(() => {
      setGreeting(getGreeting());
      fetchRSS();
    }, []);
  
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) return 'Chào buổi sáng!';
      else if (currentHour < 18) return 'Chào buổi chiều!';
      else return 'Chào buổi tối!';
    };
  
    const fetchRSS = async () => {
        try {
            const response = await axios.get('https://vnexpress.net/rss/suc-khoe.rss', {
              headers: {
                'Content-Type': 'application/xml',
              },
            });
            
            const rssText = response.data;
            const parser = new XMLParser();
            const rssData = parser.parse(rssText);
            const articles = rssData?.rss?.channel?.item || [];
            
            setRssArticles(articles);
          } catch (error) {
            console.error('Error fetching RSS feed with axios:', error);
          }
      };
  
    const renderArticle = ({ item }) => {
      const getImageUrl = (description) => {
        const match = description.match(/<img.*?src="(.*?)"/);
        return match ? match[1] : null;
      };
  
      const imageUrl = getImageUrl(item.description);
      const cleanDescription = item.description.replace(/<[^>]+>/g, '');
  
      const handlePress = () => {
        navigation.navigate('WebView', { url: item.link });
      };
  
      return (
        <TouchableOpacity
          style={styles.rssCard}
          onPress={handlePress}
        >
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.articleImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.articleDescription}>
            {cleanDescription}
          </Text>
        </TouchableOpacity>
      );
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.appointmentCard}>
        <Icon name={item.icon} size={30} color="#fff" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.place}>{item.place}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      </View>
    );
  
    const loadMore = () => {
      setVisibleItems(prevItems => Math.min(prevItems + 5, rssArticles.length));
    };
  
    const displayedArticles = rssArticles.slice(0, visibleItems);
    
    const handleScroll = (event) => {
      const offsetY = event.nativeEvent.contentOffset.y;
  
       if (offsetY > 1000) {
          setShowScrollTop(true);
       } else {
          setShowScrollTop(false);
      }
    };
  
    const scrollToTop = () => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      };
  
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
            <View style={styles.contentContainer}>
                <FlatList
                    ref={listRef}
                    data={[{ key: 'content' }]}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    renderItem={() => (
                        <>
                            <View style={styles.container}>
                                <View style={styles.welcomeContainer}>
                                    <Image
                                        style={styles.logo}
                                        source={{ uri: userInfo?.patientImage }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '600' }}>{userInfo?.patientName}</Text>
                                        <Text style={{ fontSize: 16, color: '#666' }}>{greeting}</Text>
                                    </View>
                                </View>
                            </View>
    
                            <View style={styles.container}>
                                <Text style={styles.header}>Lịch hẹn sắp tới</Text>
                                <View style={styles.appointmentContainer}>
                                    <FlatList
                                        data={appointments}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id.toString()}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        nestedScrollEnabled
                                    />
                                </View>
                            </View>
    
                            <View style={styles.container}>
                                <Text style={styles.header}>Bài báo sức khỏe</Text>
                                {displayedArticles.map((item, index) => (
                                    <View key={item.link || index.toString()}>
                                        {renderArticle({ item, index })}
                                    </View>
                                ))}
                                {visibleItems < rssArticles.length && (
                                    <TouchableOpacity 
                                        style={styles.viewMoreButton}
                                        onPress={loadMore}
                                    >
                                        <Text style={styles.viewMoreText}>
                                            Xem thêm
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    )}
                    contentContainerStyle={styles.scrollContainer}
                />
                
                {showScrollTop && (
                    <TouchableOpacity 
                    style={[styles.scrollTopButton]}
                        onPress={scrollToTop}
                        activeOpacity={0.8}
                    >
                        <AntDesign name="arrowup" size={24} color="white" />
                    </TouchableOpacity>
                )}
                </View>
            </ImageBackground>
        </View>
    );
};
const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(244, 246, 252, 0.9)',
      padding: 20,
      borderRadius: 10,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    scrollContainer: {
      paddingBottom: 100,
    },
    contentContainer: {
      marginTop: 30
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    welcomeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      // backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 10,
      borderRadius: 10,
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    bellIcon: {
      marginRight: 0,
      alignSelf: 'center',
    },
    appointmentContainer: {
      marginBottom: 20,
    },
    appointmentCard: {
      flexDirection: 'row',
      backgroundColor: 'rgba(77, 157, 224, 0.9)',
      borderRadius: 10,
      padding: 10,
      marginRight: 10,
      alignItems: 'center',
      width: 250,
    },
    title: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    place: {
      color: '#fff',
      fontSize: 14,
    },
    dateContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    date: {
      color: '#fff',
      marginRight: 20,
    },
    time: {
      color: '#fff',
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    categoryCard: {
      width: '45%',
      alignItems: 'center',
      padding: 10,
      backgroundColor: "#FFF",
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    categoryText: {
      marginTop: 10,
      fontSize: 16,
      color: '#4D9DE0',
    },
    rssCard: {
      padding: 15,
      marginVertical: 8,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
    },
    articleTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    articleDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
    },
    articleImage: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginBottom: 10,
    },
    viewMoreButton: {
      padding: 10,
      alignItems: 'center',
      backgroundColor: '#4D9DE0',
      borderRadius: 8,
      marginTop: 10,
    },
    viewMoreText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    scrollTopButton: {
      position: 'absolute',
      bottom: 85,
      right: 30,
      backgroundColor: '#4D9DE0',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

export default HomePage;