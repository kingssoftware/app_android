import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import Video, {OnBufferData} from 'react-native-video';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from '../../style/boody';

interface ListModalProps {
  visible: boolean;
  onClose: () => void;
  videoList: any[] | undefined;
  isDownloading?: boolean;
}

const VideoLstModal: React.FC<ListModalProps> = ({
  visible,
  onClose,
  videoList,
  isDownloading = false,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // Function to generate the video URL based on the fileName
  const getVideoUrl = (fileName: string) => {
    return `https://atekoapi.kingssoftware.com.br/VideoHelp/GetVideoStreaming?fileName=${fileName}`;
  };

  // Automatically select the first video when the modal opens
  useEffect(() => {
    if (visible && videoList && videoList.length > 0) {
      setSelectedVideo(videoList[0]);
      setIsLoadingVideo(true); // Start video loading
    }
  }, [visible, videoList]);

  // Function to select a video from the list
  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
    setIsLoadingVideo(true); // Reset loading state when selecting a new video
  };

  // Function to close the modal and deselect the video
  const handleClose = () => {
    setSelectedVideo(null); // Deselect the video
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      animationType="slide"
      transparent={true}>
      <View style={localStyle.modalContainer}>
        <View style={localStyle.modalContent}>
          {/* Video Preview Section */}
          <View style={localStyle.previewContainer}>
            <View style={localStyle.previewTitleContainer}>
              <Text style={localStyle.previewTitle}>
                {selectedVideo?.title || 'Selecione um vídeo'}
              </Text>
            </View>
            <View style={localStyle.videoWrapper}>
              {isLoadingVideo && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={localStyle.loadingIndicator}
                />
              )}
              {selectedVideo && (
                <Video
                  source={{uri: getVideoUrl(selectedVideo.fileName)}} // Dynamically generate URL
                  style={localStyle.video}
                  controls
                  resizeMode="contain"
                  muted={false}
                  ignoreSilentSwitch="ignore"
                  onError={(e: any) =>
                    console.error('Erro ao reproduzir:', e.nativeEvent)
                  }
                  onLoad={() => setIsLoadingVideo(false)}
                  onBuffer={({isBuffering}: OnBufferData) =>
                    setIsBuffering(isBuffering)
                  }
                  bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000,
                  }}
                />
              )}
              {isBuffering && (
                <View style={localStyle.bufferingOverlay}>
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              )}
            </View>
          </View>

          {/* Video List */}
          <View style={{maxHeight: hp('40%')}}>
            <FlatList
              data={videoList}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    localStyle.listItem,
                    item.id === selectedVideo?.id && localStyle.selectedItem, // Highlight selected item
                  ]}
                  onPress={() => handleVideoSelect(item)}>
                  <Image
                    source={{
                      uri: 'https://www.citypng.com/public/uploads/preview/video-play-watch-player-green-icon-transparent-background-701751694974356mpm8vhzq5a.png',
                    }}
                    style={localStyle.itemThumbnail}
                  />
                  <View style={localStyle.itemTextContainer}>
                    <Text style={localStyle.itemTitle}>{item.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={localStyle.itemDuration}>
                        12:32 'valor ilustrativo'
                      </Text>
                      {item.isNew && <View style={localStyle.newBadge} />}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>

          {/* Download Indicator */}
          {isDownloading && (
            <View style={localStyle.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={localStyle.loadingText}>Baixando vídeo...</Text>
            </View>
          )}

          {/* Footer */}
          <View style={localStyle.modalFooter}>
            {!isDownloading && (
              <TouchableOpacity
                style={[
                  styles.btnSuccess,
                  {
                    width: wp('85%'),
                  },
                ]}
                onPress={handleClose}>
                <Text
                  style={{
                    color: 'whitesmoke',
                    fontSize: wp('5.5%'),
                    fontFamily: 'accid',
                  }}>
                  Lukk
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const localStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('95%'),
    backgroundColor: 'rgb(211, 211, 211)',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  previewContainer: {
    marginBottom: 10,
  },
  previewTitleContainer: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  previewTitle: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  videoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('32%'),
    backgroundColor: 'green',
  },
  video: {
    width: '100%',
    height: '100%',
    color: 'white',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
  bufferingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedItem: {
    borderColor: 'green',
    borderWidth: 2,
  },
  itemThumbnail: {
    width: wp('15%'),
    height: hp('8%'),
    borderRadius: 5,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
  },
  itemDuration: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: 'yellow',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  downloadIcon: {
    marginLeft: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: wp('4%'),
  },
  modalFooter: {
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default VideoLstModal;
