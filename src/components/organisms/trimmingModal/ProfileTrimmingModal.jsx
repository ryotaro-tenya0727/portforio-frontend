import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReactCrop from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

import { SampleImageButton, Circular } from '../../atoms/atoms';
import { s3PresignedUrlRepository } from '../../../repositories/s3PresignedUrlRepository';
import { useAuth0 } from '@auth0/auth0-react';

import { useImageCrop } from '../../../hooks/usefulFunction/useImageCrop';

import form from './../../../css/templates/form.module.css';
import button from './../../../css/atoms/button.module.scss';
import card from './../../../css/organisms/card.module.css';
