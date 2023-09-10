import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI({ closed: true, width: 400 })

const debugObject = { // Create an object to handle color properties
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2})
    }
}

gui.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color) // Make the material use the color
})

gui.add(debugObject, 'spin')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//filling the Debug panel
//The next parameters handle, minimum, maximum, step(or precision)
gui.add(mesh.position, 'y', -3, 3, 0.01).name('elevation') // One way to do this
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('horizontal') // Other way to do the same
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('frontal')
gui.add(mesh, 'visible') // control boolean properties for debug
gui.add(material, 'wireframe')


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()