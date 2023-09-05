import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

scene.add(mesh)

// Setting position in one shot
mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(2, 0.5, 0.5) // Set scale at once

// Rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
/*
 Be careful, when you rotate on an axis, you might also rotate the other axis
 The rotation goes by default in the x, y and z order and you can get strange result
 like an axis not work anymore, this is called gimbal lock.
 For fix it you can change this order by using the reorder(...) method 
 object.rotation.reorder('yxz') Do it before changing the rotation
 */

// Axes helper
const axesHelper = new THREE.AxesHelper(1.5)
scene.add(axesHelper)

// Normalize position
//mesh.position.normalize()
//console.log(mesh.position.length())


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
scene.add(camera)

// Positioning the camera with lookAt
camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)