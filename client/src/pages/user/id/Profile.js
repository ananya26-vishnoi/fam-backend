import React, { useEffect } from 'react'
import './Profile.css'
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';



function Profile() {
  const env = {
    "BACKEND_URL": process.env.REACT_APP_BACKEND,
  }

    const userData = useParams();
  
  async function loadInitial() {
    try {
      const fetchResponse = await axios.get(env["BACKEND_URL"] + "/user/all_posts", {
        params: {
          demo_user: false,
          user: userData.id // Replace with the actual user ID
        },
      });
      const posts = fetchResponse.data;
      renderPosts(posts);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  }

  function renderPosts(posts) {
    const postsContainer = document.getElementById('inbox');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.classList.add('app-element', 'message');
      postElement.setAttribute('data-v-ad714b58', ''); // Add the attribute here

      const headerElement = document.createElement('header');
      headerElement.classList.add('app-element', 'info');
      headerElement.setAttribute('data-v-ad714b58', ''); // Add the attribute here

      const profilePicture = document.createElement('img');
      profilePicture.src = '/profilePicture-default.png';
      profilePicture.classList.add('app-element', 'profile-picture', 'default-profile-picture');
      profilePicture.setAttribute('data-v-ad714b58', ''); // Add the attribute here

      const authorElement = document.createElement('p');
      authorElement.classList.add('app-element', 'author');
      authorElement.textContent = post.username;
      authorElement.setAttribute('data-v-ad714b58', ''); // Add the attribute here

      const timeElement = document.createElement('p');
      timeElement.classList.add('app-element', 'time');
      timeElement.textContent = post.created_at;
      timeElement.setAttribute('data-v-ad714b58', ''); // Add the attribute here

      headerElement.appendChild(profilePicture);
      headerElement.appendChild(authorElement);
      headerElement.appendChild(timeElement);

      const contentElement = document.createElement('div');
      contentElement.classList.add('app-element', 'message-content');
      contentElement.setAttribute('data-v-ad714b58', ''); // Add the attribute here

      // Check for content type and render accordingly
      if (post.photo) {
        const imageElement = document.createElement('img');
        imageElement.src = post.photo;
        imageElement.style.width = '100%';
        imageElement.style.height = '100%';
        imageElement.classList.add('post-image');
        contentElement.appendChild(imageElement);
      }

      if (post.audio) {
        const audioElement = document.createElement('audio');
        audioElement.src = post.audio;
        audioElement.controls = true;
        contentElement.appendChild(audioElement);
      }

      if (post.video) {
        const videoElement = document.createElement('video');
        videoElement.src = post.video;
        videoElement.controls = true;
        contentElement.appendChild(videoElement);
      }

      if (post.text) {
        const textElement = document.createElement('p');
        textElement.textContent = post.text;
        contentElement.appendChild(textElement);
      }

      postElement.appendChild(headerElement);
      postElement.appendChild(contentElement);

      postsContainer.appendChild(postElement);
    });
  }

  function handleDropdownElement(e) {
    e.target.parentElement.classList.add("hidden")
  }

  function handleDropdown(e) {
    let list = e.target.parentElement.querySelector(".list")
    if (list.classList.contains("hidden")) {
      list.classList.remove("hidden")
    } else {
      list.classList.add("hidden")
    }
  }

  function openFileUpload() {
    const fileInput = document.getElementById('image-preview');
    fileInput.click();
  }
  function openAudioUpload() {
    const fileInput = document.getElementById('audio-preview');
    fileInput.click();
  }
  function openVideoUpload() {
    const fileInput = document.getElementById('video-preview');
    fileInput.click();
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    // Your logic to handle the uploaded image here
    if (file) {
      // Example: Display a preview of the uploaded image
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.createElement('img');
        preview.src = e.target.result;
        // Assuming you have an element with ID 'image-preview' to display the uploaded image
        document.getElementById('image-preview').appendChild(preview);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleAudioUpload(event) {
    const file = event.target.files[0];
    // Check if the uploaded file is an audio file (e.g., MP3, WAV, etc.)
    if (file && file.type.startsWith('audio/')) {
      // Example: Display a preview of the uploaded audio (e.g., show audio player)
      const audioPlayer = document.createElement('audio');
      audioPlayer.controls = true;
      const source = document.createElement('source');
      source.src = URL.createObjectURL(file);
      audioPlayer.appendChild(source);
      // Assuming you have an element with ID 'audio-preview' to display the uploaded audio
      document.getElementById('audio-preview').appendChild(audioPlayer);
    } else {
      // Handle case where the uploaded file is not an audio file
      console.error('Please upload a valid audio file.');
    }
  }

  function handleVideoUpload(event) {
    const file = event.target.files[0];
    // Check if the uploaded file is a video file (e.g., MP4, MOV, etc.)
    if (file && file.type.startsWith('video/')) {
      // Example: Display a preview of the uploaded video (e.g., show video player)
      const videoPlayer = document.createElement('video');
      videoPlayer.controls = true;
      const source = document.createElement('source');
      source.src = URL.createObjectURL(file);
      videoPlayer.appendChild(source);
      // Assuming you have an element with ID 'video-preview' to display the uploaded video
      document.getElementById('video-preview').appendChild(videoPlayer);
    } else {
      // Handle case where the uploaded file is not a video file
      console.error('Please upload a valid video file.');
    }
  }

  async function sharePost() {
    console.log(userData)
    var current_url = window.location.href;
    var demo_account = false
    if (current_url.includes("demo_account")) {
      demo_account = true
    }
    //get the audio, video, text, image and print it to console
    let content = document.querySelector('#content').value;

    const fileInput = document.getElementById('image-preview');
    const fileAudio = document.getElementById('audio-preview');
    const fileVideo = document.getElementById('video-preview');

    const formData = new FormData();
    formData.append('text', content);
    formData.append('demo_user', demo_account);
    formData.append('user',userData.id);

    if (content === "" && fileInput.files.length === 0 && fileAudio.files.length === 0 && fileVideo.files.length === 0) {
      console.log("Please enter some content or upload a file")
      toast.warn("Please enter some content or upload a file")
      return
    }

    if (fileInput.files.length > 0) {
      const imageFile = fileInput.files[0];
      console.log(`Filename: ${imageFile.name}`);
      formData.append('photo', imageFile);
    }
    if (fileAudio.files.length > 0) {
      const audioFile = fileAudio.files[0];
      console.log(`Filename: ${audioFile.name}`);
      formData.append('audio', audioFile);
    }
    if (fileVideo.files.length > 0) {
      const videoFile = fileVideo.files[0];
      console.log(`Filename: ${videoFile.name}`);
      formData.append('video', videoFile);
    }


    try {
      await axios.post(env["BACKEND_URL"] + "/user/create_post", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      document.querySelector('#content').value = "";
      fileInput.value = "";
      fileAudio.value = "";
      fileVideo.value = "";
      // Fetch all posts after sharing a new post
      const fetchResponse = await axios.get(env["BACKEND_URL"] + "/user/all_posts", {
        params: {
          demo_user: demo_account,
          user:userData.id // Replace with the actual user ID
        },
      });

      const posts = fetchResponse.data;
      renderPosts(posts);
    } catch (error) {
      console.error('Error sharing or fetching posts', error);
      const error_msg = error.response.data.error
      toast.error(error_msg)
    }

  }

  useEffect(()=>{loadInitial()})
  return (
    <div className="app-element content profile invisible-scrollbar">
    <section className="app-element invisible-scrollbar" id="user">
      <img src="/logo.png" className="app-element logo" alt="FamSketch" />
      <img alt="profilePicture-default" src="/profilePicture-default.png" className="app-element profile-picture default-profile-picture"
        id="panel-profile-picture" />
      <h2 className="app-element name">{ userData.user.toLowerCase().replaceAll("_", " ") }</h2>
      <div className="app-element social">
        <p className="app-element people icon-text-wrapper">
          <i className="app-element bx bxs-group"></i>
          <span id="number">###</span>
        </p>
        <Link to="{ name: 'user-id-calendar', params: userData }" className="app-element link">
          <i className="app-element bx bx-calendar"></i>
        </Link>
        <a href="" className="app-element function">
          <i className="app-element bx bx-heart"></i>
        </a>
        <a href="" className="app-element function">
          <i className="app-element bx bx-share-alt"></i>
        </a>
        <button className="app-element dropdown">
          <i onClick={handleDropdown} className="app-element bx bxs-down-arrow"></i>
          <div className="app-element list hidden">
            <a onClick={handleDropdownElement} className="app-element link element">
              <i className="app-element bx bxl-instagram-alt"></i>
            </a>
            <a onClick={handleDropdownElement} className="app-element link element">
              <i className="app-element bx bxl-facebook-square"></i>
            </a>
            <a onClick={handleDropdownElement} className="app-element link element">
              <i className="app-element bx bxl-twitter"></i>
            </a>
            <a onClick={handleDropdownElement} className="app-element link element">
              <i className="app-element bx bxl-linkedin-square"></i>
            </a>
            <a onClick={handleDropdownElement} className="app-element link element">
              <i className="app-element bx bxl-youtube"></i>
            </a>
          </div>
        </button>
      </div>
      <div className="app-element info">
        <p className="app-element birth info"><span className="app-element tag">Born:</span> DD.MM.YYYY</p>
        <p className="app-element location info"><span className="app-element tag">City:</span> Košice</p>
        <p className="app-element relationship-status info"><span className="app-element tag">Status:</span> Single</p>
      </div>

      <p className="app-element quote">We are memories for our loved ones.</p>
    </section>
    <section className="app-element center invisible-scrollbar">
      <div className="app-element pannel">
        {/* <!-- <h2 class="app-element pannel-title" >What's on your mind?</h2> --> */}
        <input type="text" className="app-element pannel-title" id="content" placeholder="What's on your mind?" />

        {/* <!-- Photo --> */}
        <Link className="app-element function icon-text-wrapper" id="photo-function" onClick={openFileUpload}>
          <i className="app-element bx bxs-image"></i>
          Photo
        </Link>
        <input type="file" id="image-preview" className="hidden" accept="image/*" onChange={e=>handleImageUpload(e)} />
        {/* <!-- Audio --> */}
        <Link className="app-element function icon-text-wrapper" id="audio-function" onClick={openAudioUpload}>
          <i className="app-element bx bxs-music"></i>
          Audio
        </Link>
        <input type="file" id="audio-preview" className="hidden" accept="audio/*" onChange={e=>handleAudioUpload(e)} />
        {/* <!-- Video --> */}
        <Link className="app-element function icon-text-wrapper" id="video-function" onClick={openVideoUpload}>
          <i className="app-element bx bxs-video"></i>
          Video
        </Link>
        <input type="file" id="video-preview" className="hidden" accept="video/*" onChange={e=>handleVideoUpload(e)} />

        {/* <!-- Share --> */}


        <button data-v-ad714b58="" className="app-element button" id="share-function" onClick={sharePost} data-nuxt-link>
          Share
        </button>
      </div>



      <div className="app-element" id="inbox" >
        {/* <!-- <div class="posts-container" id="posts-container"> --> */}
        {/* <!-- <article class="app-element message" id="app-element message" v-for="message of useDemoData().inbox" :key="message.at"> */}
          {/* <header class="app-element info">
            <img src="/profilePicture-default.png" class="app-element profile-picture default-profile-picture" />
            <p class="app-element author">{message.from.params.user.toLowerCase().replaceAll("_", " ")}</p>
            <p class="app-element time">{message.at}</p>
          </header>
          <p class="app-element message-content">{message.content}</p> */}
        {/* </article> --> */}
      </div>
      {/* <!-- </div> --> */}
    </section>
    <section className="app-element invisible-scrollbar" id="advertising">
      <a href="#" >
        <img src="/ad-1.png" className="app-element ad" alt="Ad" />
      </a>
      <a href="#" >
        <img src="/ad-1.png" className="app-element ad" alt="Ad" />
      </a>
      <a href="#" >
        <img src="/ad-1.png" className="app-element ad" alt="Ad" />
      </a>
      <a href="#" >
        <img src="/ad-1.png" className="app-element ad" alt="Ad" />
      </a>
      <a href="#" >
        <img src="/ad-1.png" className="app-element ad" alt="Ad" />
      </a>
      <a href="#" >
        <img src="/ad-1.png" className="app-element ad" alt="Ad" />
      </a>
    </section>
  </div>
  )
}

export default Profile