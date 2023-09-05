import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

let previousTime = Date.now() // Subtract the previous time to get the deltaTime
const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })


// Animations
const frameTick = () => {
    // * Solution using Date.time() *
    // const currentTime = Date.now() 
    // const deltaTime = currentTime - previousTime
    // previousTime = currentTime

    /*
    It's important that our animation run in the same framerate in any other different computer,
    To maintain our application equal in all computers and don't have any differences. Because of
    that we need use Date.time() to get a timestamp and use it in our animation to garanty equal 
    framerates. Date.time is one of others solutions, Threejs have other built in function called Clock
    */

    // * Solution using Clock *
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y += 0.002 * deltaTime
    //mesh.rotation.y = elapsedTime * Math.PI * 2
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)

    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(frameTick)
}

frameTick()